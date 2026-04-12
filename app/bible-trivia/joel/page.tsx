import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function JoelTriviaBookPage() {
  const book = getTriviaBook("joel");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
