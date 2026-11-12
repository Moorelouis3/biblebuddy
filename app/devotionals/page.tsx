import { redirect } from "next/navigation";

/**
 * /devotionals was the old shelf. It is /library now.
 *
 * This page was the last thing still rendering it: one screen headed "Plans"
 * with a Bible in One Year / Devotionals / Articles tab strip (Louis,
 * 2026-09-05: "everything is there but just different tabs, not 50 different
 * pages"). The Library replaced it on 2026-10-16 and /plans and
 * /bible-studies were pointed here's successor straight away - but this URL
 * kept the old screen alive, and so did the app, because the dashboard's
 * Library tab imported this file's component. So backing out of a study
 * landed on a shelf no other way into the app could reach, with its own
 * covers, its own filters and its own idea of what you had finished.
 *
 * Louis, 2026-11-12, on The Tempting of Jesus: "when I click the back button
 * or go back to studies... it sends you back to the old handout page that has
 * the old library page that has the three different the devotionals, the
 * things, all that. That's not how this is set up... get rid of the old
 * library page."
 *
 * A redirect rather than a deletion: /devotionals is where
 * app/study/[slug]/page.tsx sends an unknown study slug, where
 * lib/studyMode.ts points, and it is in bookmarks and older links. Study deep
 * links under /devotionals/<id> are untouched and still resolve - only the
 * index moved. The lists that used to live in this file are in
 * lib/studyLibrary.ts, and the shelf itself is components/library/LibraryPage.tsx.
 */
export default function DevotionalsIndexPage() {
  redirect("/library");
}
