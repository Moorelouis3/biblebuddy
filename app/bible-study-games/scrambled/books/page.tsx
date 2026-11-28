import { redirect } from "next/navigation";

// Scrambled is retired (app/api/scrambled-progress, app/api/scrambled-answer).
// Send people to Bible Trivia, its replacement, instead of a book list whose
// game can no longer save anything.
export default function ScrambledBooksPage() {
  redirect("/bible-study-games/clue");
}
