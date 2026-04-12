import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function ThirdJohnTriviaBookPage() {
  const book = getTriviaBook("3john");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}

