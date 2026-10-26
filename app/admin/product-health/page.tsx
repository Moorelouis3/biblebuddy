"use client";

import ProductHealthDashboard from "@/components/admin/ProductHealthDashboard";

/**
 * Product Health (2026-10-26). Same shape as /admin/analytics: the page is a
 * shell and everything lives in the component, so the view can be embedded
 * elsewhere later without moving the route.
 */
export default function ProductHealthPage() {
  return <ProductHealthDashboard />;
}
