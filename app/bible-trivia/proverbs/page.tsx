import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function ProverbsTriviaBookPage() {
  const book = getTriviaBook("proverbs");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
