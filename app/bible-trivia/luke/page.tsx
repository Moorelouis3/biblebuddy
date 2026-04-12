import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function LukeTriviaBookPage() {
  const book = getTriviaBook("luke");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
