import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function GalatiansTriviaBookPage() {
  const book = getTriviaBook("galatians");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
