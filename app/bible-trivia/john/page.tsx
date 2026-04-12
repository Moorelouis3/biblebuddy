import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function JohnTriviaBookPage() {
  const book = getTriviaBook("john");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
