import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function ExodusTriviaBookPage() {
  const book = getTriviaBook("exodus");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
