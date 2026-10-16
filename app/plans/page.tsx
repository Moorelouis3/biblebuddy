import { redirect } from "next/navigation";

/**
 * /plans was the shelf until 2026-10-16; it is /library now. Kept as a
 * redirect rather than deleted, because this URL is in bookmarks, push
 * notifications and older links. /plans/<anything> still goes to the study
 * itself through app/plans/[...slug].
 */
export default function PlansIndexPage() {
  redirect("/library");
}
