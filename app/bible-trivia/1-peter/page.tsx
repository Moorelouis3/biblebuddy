import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function FirstPeterTriviaBookPage() {
  const book = getTriviaBook("1peter");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
