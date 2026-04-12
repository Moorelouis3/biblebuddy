import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function SecondJohnTriviaBookPage() {
  const book = getTriviaBook("2john");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}

