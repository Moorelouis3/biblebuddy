import { notFound } from "next/navigation";
import TriviaBookClient from "@/components/TriviaBookClient";
import { getTriviaBook } from "@/lib/triviaGameData";

export default function FirstChroniclesTriviaBookPage() {
  const book = getTriviaBook("1chronicles");

  if (!book) {
    notFound();
  }

  return <TriviaBookClient book={book} />;
}
