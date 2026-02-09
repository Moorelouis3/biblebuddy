import type { ReactNode } from "react";
import TriviaPageTitle from "@/components/TriviaPageTitle";

export default function BibleTriviaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TriviaPageTitle />
      {children}
    </>
  );
}
