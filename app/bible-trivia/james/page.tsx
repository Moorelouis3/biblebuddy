import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function JamesTriviaBookPage() {
  const book = getTriviaBook("james");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
