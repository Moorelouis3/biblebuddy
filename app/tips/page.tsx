import type { Metadata } from "next";
import TipsPage from "@/components/popups/TipsPage";

export const metadata: Metadata = {
  title: "Tips | Bible Buddy",
  description: "Short guides to the main parts of Bible Buddy.",
  robots: { index: false },
};

export default function Page() {
  return <TipsPage />;
}
