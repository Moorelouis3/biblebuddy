"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BibleYearJourneyDashboard from "../../components/BibleYearJourneyDashboard";
import AdminAnalyticsPreloader from "../../components/AdminAnalyticsPreloader";
import HomeScreen from "../../components/HomeScreen";

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
  const wantsPlanPage = PLAN_PAGE_PARAMS.some((key) => searchParams.has(key));

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
