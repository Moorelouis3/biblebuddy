import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function FirstKingsTriviaBookPage() {
  const book = getTriviaBook("1kings");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
