import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function JeremiahTriviaBookPage() {
  const book = getTriviaBook("jeremiah");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
