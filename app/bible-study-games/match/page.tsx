import type { Metadata } from "next";
import MatchGame from "@/components/match/MatchGame";

export const metadata: Metadata = {
  title: "Bible Buddy Match",
  description: "Match three through Genesis: Creation and the Garden of Eden.",
};

export default function MatchPage() {
  return <MatchGame />;
}
