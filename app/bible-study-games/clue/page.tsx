import type { Metadata } from "next";
import ClueGame from "@/components/clueGame/ClueGame";

export const metadata: Metadata = {
  title: "Bible Trivia | Bible Buddy",
  description: "How well do you know the Bible? Pick a book and chapters, Easy, Medium or Hard, ten questions, ten seconds each. Play solo, with friends, or take a Buddy's challenge.",
};

/**
 * Bible Trivia (the Bible Clue Game until 2026-11-23), presented by Bible Buddy: the last feature planned for
 * 1.0 (Louis, 2026-11-22). Solo play first; rooms and online matches will
 * run the same engine (lib/clueGame/engine.ts) on the server. Under
 * /bible-study-games so the Games tab stays lit and it is signed-in only,
 * like the other games.
 */
export default function BibleClueGamePage() {
  return <ClueGame />;
}
