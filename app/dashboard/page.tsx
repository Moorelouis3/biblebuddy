"use client";

export const dynamic = "force-dynamic";

import BibleYearJourneyDashboard from "../../components/BibleYearJourneyDashboard";
import AdminAnalyticsPreloader from "../../components/AdminAnalyticsPreloader";

export default function DashboardPage() {
  return (
    <>
      <AdminAnalyticsPreloader />
      <BibleYearJourneyDashboard />
    </>
  );
}
