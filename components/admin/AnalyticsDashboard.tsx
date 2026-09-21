"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { DashboardData, DashboardWindow } from "@/lib/adminDashboard";
import AnalyticsDashboardView from "@/components/admin/AnalyticsDashboardView";

/**
 * Owner analytics (rebuilt 2026-09-21 from Louis's desktop + mobile mockups).
 * This file only handles access and loading; the layout is
 * components/admin/AnalyticsDashboardView.tsx. The old page is at
 * /admin/analytics/legacy.
 */


export default function AnalyticsDashboard({ embedded = false }: { embedded?: boolean }) {
  void embedded;
  const [checked, setChecked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [windowKey, setWindowKey] = useState<DashboardWindow>("7d");
  const [data, setData] = useState<(DashboardData & { snapshotAt?: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data: u }) => {
      setIsOwner(u.user?.email === "moorelouis3@gmail.com");
      setChecked(true);
    });
  }, []);

  const load = useCallback(async (window: DashboardWindow, fresh: boolean) => {
    const { data: session } = await supabase.auth.getSession();
    const token = session.session?.access_token;
    if (!token) return;
    fresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/dashboard?window=${window}${fresh ? "&fresh=1" : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
      setData(body);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load analytics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isOwner) void load(windowKey, false);
  }, [isOwner, windowKey, load]);

  if (!checked) return <div className="p-10 text-sm font-bold text-[#64748b]">Checking access…</div>;
  if (!isOwner) return <div className="p-10 text-sm font-bold text-[#64748b]">This page is private.</div>;


  return (
    <AnalyticsDashboardView
      data={data}
      windowKey={windowKey}
      onWindow={setWindowKey}
      onRefresh={() => void load(windowKey, true)}
      loading={loading}
      refreshing={refreshing}
      error={error}
    />
  );
}
