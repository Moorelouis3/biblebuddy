"use client";

import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

// Owner analytics (2026-09-21). All logic lives in the shared component so the
// owner dashboard can embed the same view.
export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
