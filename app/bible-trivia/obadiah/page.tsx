import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function ObadiahTriviaBookPage() {
  const book = getTriviaBook("obadiah");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
