import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function PsalmsTriviaBookPage() {
  const book = getTriviaBook("psalms");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
