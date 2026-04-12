import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function ZephaniahTriviaBookPage() {
  const book = getTriviaBook("zephaniah");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
