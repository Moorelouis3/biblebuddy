import type { Metadata } from "next";
import ClueChallenge from "@/components/clueGame/ClueChallenge";

export const metadata: Metadata = { title: "Bible Trivia challenge | Bible Buddy", robots: { index: false } };

/** A Feed challenge: the same 10 cards for everyone, and a leaderboard. */
export default async function ClueChallengePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ClueChallenge id={String(id).replace(/[^A-Za-z0-9]/g, "").slice(0, 12)} />;
}
