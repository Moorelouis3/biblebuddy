import type { Metadata } from "next";
import BibleMemoryHome from "@/components/memory/BibleMemoryHome";

export const metadata: Metadata = {
  title: "Bible Memory | Bible Buddy",
  description: "Save a verse and practise it with three short games.",
};

/**
 * Bible Memory lives under /bible-study-games so the Games tab stays lit and
 * the proxy treats it like the other games: signed-in only, nothing public.
 */
export default function BibleMemoryPage() {
  return <BibleMemoryHome />;
}
