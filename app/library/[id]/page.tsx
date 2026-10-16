"use client";

export const dynamic = "force-dynamic";

import { use } from "react";
import StudyDetailPage from "../../../components/library/StudyDetailPage";

/** /library/<devotional id> - one study guide's detail page. */
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <StudyDetailPage studyId={id} />;
}
