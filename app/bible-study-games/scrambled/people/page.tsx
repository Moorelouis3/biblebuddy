import { redirect } from "next/navigation";

// Scrambled is retired (app/api/scrambled-progress, app/api/scrambled-answer).
// Send people to Bible Trivia, its replacement.
export default function ScrambledPeoplePage() {
  redirect("/bible-study-games/clue");
}
