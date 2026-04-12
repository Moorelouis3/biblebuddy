import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function HabakkukTriviaBookPage() {
  const book = getTriviaBook("habakkuk");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
