import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function MarkTriviaBookPage() {
  const book = getTriviaBook("mark");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
