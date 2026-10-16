import { redirect } from "next/navigation";

/** The shelf lives at /library since 2026-10-16. Study deep links under
 *  /bible-studies/<id> are untouched and still resolve. */
export default function BibleStudiesIndexPage() {
  redirect("/library");
}
