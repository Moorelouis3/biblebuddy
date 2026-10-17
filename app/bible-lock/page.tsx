import type { Metadata } from "next";
import BibleLockPage from "@/components/bible-lock/BibleLockPage";

export const metadata: Metadata = {
  title: "Bible Lock | Bible Buddy",
  description:
    "Lock the apps that get your attention first until you have done today's reading. Bible Buddy never sees which apps you choose, and you can unlock them at any time.",
};

export default function Page() {
  return <BibleLockPage />;
}
