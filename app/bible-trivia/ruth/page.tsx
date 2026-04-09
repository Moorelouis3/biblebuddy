import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function RuthTriviaBookPage() {
  const book = getTriviaBook("ruth");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
