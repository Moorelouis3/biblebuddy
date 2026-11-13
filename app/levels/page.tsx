import type { Metadata } from "next";
import LevelsPage from "@/components/levels/LevelsPage";

/**
 * /levels: the reader's level, every level, how XP is earned, and their
 * badges. Opened from the level card on the dashboard
 * (components/LevelProgressCard.tsx). Signed-in only: proxy.ts sends anybody
 * else to sign up, which is right, since there is nothing here without an
 * account.
 */
export const metadata: Metadata = { title: "Your Level | Bible Buddy" };

export default function Page() {
  return <LevelsPage />;
}
