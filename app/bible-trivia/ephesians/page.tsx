import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function EphesiansTriviaBookPage() {
  const book = getTriviaBook("ephesians");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
