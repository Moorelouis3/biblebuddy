import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function NumbersTriviaBookPage() {
  const book = getTriviaBook("numbers");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
