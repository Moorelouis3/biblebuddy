"use client";

export const dynamic = "force-dynamic";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import BibleYearOverview from "../../../../components/library/BibleYearOverview";
import { isBibleYearStudyId } from "../../../../lib/libraryCatalog";

/**
 * /library/<id>/progress - a study guide's overview: progress bar, community,
 * Study Overview and the Progress Map.
 *
 * Only Bible in One Year is served from here. Every devotional already has
 * this screen at /devotionals/<id> and that page is unchanged, so this route
 * forwards to it rather than growing a second copy. The address shape is the
 * same for all guides, which is the point: /library/<id> opens the detail
 * page, /library/<id>/progress opens the overview, whichever guide it is.
 */
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isBibleYear = isBibleYearStudyId(id);

  useEffect(() => {
    if (!isBibleYear) router.replace(`/devotionals/${id}`);
  }, [isBibleYear, id, router]);

  if (!isBibleYear) return null;
  return <BibleYearOverview />;
}
