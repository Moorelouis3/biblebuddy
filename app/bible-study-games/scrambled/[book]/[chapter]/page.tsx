import { redirect } from "next/navigation";

// Scrambled is retired: app/api/scrambled-progress and app/api/scrambled-answer
// already return "retired" / 410 and never save anything. This page used to
// still render a fully playable game with no way to save progress, which is
// what Rachel Moore's bug report caught. Send people to Bible Trivia, its
// replacement, instead.
export default function ScrambledChapterPage() {
  redirect("/bible-study-games/clue");
}
