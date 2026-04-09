import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function DeuteronomyTriviaBookPage() {
  const book = getTriviaBook("deuteronomy");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
