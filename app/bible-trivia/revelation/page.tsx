import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function RevelationTriviaBookPage() {
  const book = getTriviaBook("revelation");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}

