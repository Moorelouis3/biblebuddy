import { redirect } from "next/navigation";

/**
 * Scrambled is retired (see app/api/scrambled-progress and
 * app/api/scrambled-answer, which no longer save anything). The page used to
 * still be fully playable with no way to save progress - this is what
 * confused Rachel Moore's bug report. Send people straight to Bible Trivia,
 * its replacement.
 */
export default function ScrambledGamesPage() {
  redirect("/bible-study-games/clue");
}
