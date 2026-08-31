"use client";

export const dynamic = "force-dynamic";

import HomeScreen from "../../components/HomeScreen";

/**
 * Lives at /home while Louis compares it with the current dashboard. Once he
 * is happy, /dashboard points here instead - the old dashboard is untouched
 * either way, so switching back is a one line change.
 */
export default function HomePage() {
  return <HomeScreen />;
}
