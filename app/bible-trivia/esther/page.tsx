import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function EstherTriviaBookPage() {
  const book = getTriviaBook("esther");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
