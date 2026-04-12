import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function JudeTriviaBookPage() {
  const book = getTriviaBook("jude");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}

