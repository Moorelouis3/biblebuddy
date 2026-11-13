import type { Metadata } from "next";
import WordSearchBooks from "@/components/wordsearch/WordSearchBooks";

export const metadata: Metadata = {
  title: "Bible Word Search | Bible Buddy",
  description: "A word search for every book of the Bible.",
};

/** Under /bible-study-games so the Games tab stays lit, like the other games. */
export default function WordSearchBooksPage() {
  return <WordSearchBooks />;
}
