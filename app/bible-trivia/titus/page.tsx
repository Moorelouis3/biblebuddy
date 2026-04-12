import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function TitusTriviaBookPage() {
  const book = getTriviaBook("titus");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
