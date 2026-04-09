import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function SecondKingsTriviaBookPage() {
  const book = getTriviaBook("2kings");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
