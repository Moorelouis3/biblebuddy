import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function SecondSamuelTriviaBookPage() {
  const book = getTriviaBook("2samuel");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
