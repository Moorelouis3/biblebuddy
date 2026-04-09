import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function GenesisTriviaBookPage() {
  const book = getTriviaBook("genesis");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
