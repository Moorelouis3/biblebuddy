import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function JonahTriviaBookPage() {
  const book = getTriviaBook("jonah");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
