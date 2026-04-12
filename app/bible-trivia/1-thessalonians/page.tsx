import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function FirstThessaloniansTriviaBookPage() {
  const book = getTriviaBook("1thessalonians");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
