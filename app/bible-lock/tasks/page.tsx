import type { Metadata } from "next";
import BibleLockTasks from "@/components/bible-lock/BibleLockTasks";

export const metadata: Metadata = {
  title: "Unlock your apps | Bible Buddy",
  description:
    "Finish any one of these - trivia, your devotional, today's reading, or a note - and the apps you locked come straight back.",
};

export default function Page() {
  return <BibleLockTasks />;
}
