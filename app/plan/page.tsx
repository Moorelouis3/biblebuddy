"use client";

export const dynamic = "force-dynamic";

import BibleYearJourneyDashboard from "../../components/BibleYearJourneyDashboard";
import AdminAnalyticsPreloader from "../../components/AdminAnalyticsPreloader";

/**
 * The Selected Plan page - what used to be the whole dashboard.
 *
 * A clean address to link to from Plans and from the journey strip on the home
 * screen, so new links do not have to keep saying /dashboard?view=. The old
 * /dashboard?view=... deep links still land on the same component.
 */
export default function PlanPage() {
  return (
    <>
      <AdminAnalyticsPreloader />
      <BibleYearJourneyDashboard />
    </>
  );
}
