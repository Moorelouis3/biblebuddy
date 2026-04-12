import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function HaggaiTriviaBookPage() {
  const book = getTriviaBook("haggai");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
