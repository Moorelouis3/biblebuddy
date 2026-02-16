import type { ReactNode } from "react";
import TriviaPageTitle from "@/components/TriviaPageTitle";
import TriviaCreditGate from "@/components/TriviaCreditGate";

export default function BibleTriviaLayout({ children }: { children: ReactNode }) {
  return (
    <TriviaCreditGate>
      <TriviaPageTitle />
      {children}
    </TriviaCreditGate>
  );
}
