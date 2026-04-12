import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function DanielTriviaBookPage() {
  const book = getTriviaBook("daniel");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
