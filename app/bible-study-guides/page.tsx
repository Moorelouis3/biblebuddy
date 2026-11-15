import { redirect } from "next/navigation";

// This was a "coming soon" placeholder long after the study guides shipped.
// The Library is where they live (audit, 2026-11-15).
export default function BibleStudyGuidesPage() {
  redirect("/library");
}
