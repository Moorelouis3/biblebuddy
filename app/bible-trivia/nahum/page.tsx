import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function NahumTriviaBookPage() {
  const book = getTriviaBook("nahum");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
