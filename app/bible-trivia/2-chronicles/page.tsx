import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function SecondChroniclesTriviaBookPage() {
  const book = getTriviaBook("2chronicles");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
