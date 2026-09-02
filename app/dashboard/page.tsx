"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BibleYearJourneyDashboard from "../../components/BibleYearJourneyDashboard";
import AdminAnalyticsPreloader from "../../components/AdminAnalyticsPreloader";
import HomeScreen from "../../components/HomeScreen";
import { BIBLE_STUDY_GROUP_ID } from "../../lib/bibleStudiesCatalog";

/**
 * /dashboard is the app's home screen now.
 *
 * The old journey dashboard became the Selected Plan page, and it is still
 * reached through this route so that none of the deep links pointing here have
 * to change - there are around 17 of them carrying ?view=, ?day=, ?study= or a
 * ?comment= anchor, against 121 plain /dashboard links that all mean "go home".
 * A bare /dashboard is home; /dashboard with any of those params is the plan
 * page. /plan is the tidy alias to link to from Plans.
 */
const PLAN_PAGE_PARAMS = ["view", "day", "study", "post", "comment"];

function DashboardRouter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const wantsPlanPage = PLAN_PAGE_PARAMS.some((key) => searchParams.has(key));

  // A plain ?view=group goes straight to the study group feed. Leaving it to
  // the old dashboard used to work, but opening the group there strips ?view
  // from the URL, which this router reads as "go home" - so the group opened
  // for a frame and vanished. Post/comment deep links still go through the
  // old dashboard, whose notification flow knows how to scroll to them.
  const plainGroupOpen =
    searchParams.get("view") === "group" && !searchParams.has("post") && !searchParams.has("comment");
  useEffect(() => {
    if (plainGroupOpen) router.replace(`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`);
  }, [plainGroupOpen, router]);
  if (plainGroupOpen) return null;

  if (wantsPlanPage) {
    return (
      <>
        <AdminAnalyticsPreloader />
        <BibleYearJourneyDashboard />
      </>
    );
  }

  return <HomeScreen />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardRouter />
    </Suspense>
  );
}
