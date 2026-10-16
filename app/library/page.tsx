"use client";

export const dynamic = "force-dynamic";

import LibraryPage from "../../components/library/LibraryPage";

/**
 * /library - the bookshelf, and what the Library tab opens directly. No
 * landing screen in front of it, per the approved mockup.
 *
 * The old /plans and /bible-studies URLs still work; they redirect here.
 */
export default function Page() {
  return <LibraryPage />;
}
