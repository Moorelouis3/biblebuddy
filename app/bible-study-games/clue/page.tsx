import type { Metadata } from "next";
import ClueGame from "@/components/clueGame/ClueGame";

export const metadata: Metadata = {
  title: "Bible Clue Game | Bible Buddy",
  description: "Five clues, five points down to one. Guess the person, place or thing from Genesis.",
};

/**
 * Bible Clue Game, presented by Bible Buddy: the last feature planned for
 * 1.0 (Louis, 2026-11-22). Solo play first; rooms and online matches will
 * run the same engine (lib/clueGame/engine.ts) on the server. Under
 * /bible-study-games so the Games tab stays lit and it is signed-in only,
 * like the other games.
 */
export default function BibleClueGamePage() {
  return <ClueGame />;
}
