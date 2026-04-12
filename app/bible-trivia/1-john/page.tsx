import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function FirstJohnTriviaBookPage() {
  const book = getTriviaBook("1john");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
