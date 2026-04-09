import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function FirstSamuelTriviaBookPage() {
  const book = getTriviaBook("1samuel");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
