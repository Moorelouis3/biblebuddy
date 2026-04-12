import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function ZechariahTriviaBookPage() {
  const book = getTriviaBook("zechariah");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
