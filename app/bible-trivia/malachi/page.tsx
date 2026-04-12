import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function MalachiTriviaBookPage() {
  const book = getTriviaBook("malachi");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
