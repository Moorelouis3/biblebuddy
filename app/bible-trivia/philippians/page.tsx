import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function PhilippiansTriviaBookPage() {
  const book = getTriviaBook("philippians");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
