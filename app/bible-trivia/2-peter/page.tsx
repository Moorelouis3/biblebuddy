import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function SecondPeterTriviaBookPage() {
  const book = getTriviaBook("2peter");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
