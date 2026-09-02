"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HomeScreen from "../../components/HomeScreen";
import { BIBLE_STUDY_GROUP_ID } from "../../lib/bibleStudiesCatalog";

/**
 * /dashboard IS the home screen - there is no other dashboard. Louis,
 * 2026-09-02: "there is no old dashboard!!! the home screen is the only
 * dashboard". The old journey dashboard survives only as the plan content
 * behind /plan, reached through the Plans tab or the day pop-up on home.
 *
 * Old deep links are forwarded to where their content lives now instead of
 * resurrecting the old dashboard here:
 *   ?view=group (with or without post/comment) -> the group feed, which
 *     handles those params natively - the old group tab was only ever an
 *     iframe of that page passing them along
 *   anything plan-shaped (?view=, ?day=, ?study=) -> /plan, same query
 */
function DashboardRouter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isGroup = searchParams.get("view") === "group" || searchParams.has("post") || searchParams.has("comment");
  const isPlan = !isGroup && (searchParams.has("view") || searchParams.has("day") || searchParams.has("study"));

  useEffect(() => {
    if (isGroup) {
      const forward = new URLSearchParams();
      const post = searchParams.get("post");
      const comment = searchParams.get("comment");
      if (post) forward.set("post", post);
      if (comment) forward.set("comment", comment);
      const query = forward.toString();
      router.replace(`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat${query ? `?${query}` : ""}`);
      return;
    }
    if (isPlan) {
      router.replace(`/plan?${searchParams.toString()}`);
    }
  }, [isGroup, isPlan, router, searchParams]);

  if (isGroup || isPlan) return null;
  return <HomeScreen />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardRouter />
    </Suspense>
  );
}
