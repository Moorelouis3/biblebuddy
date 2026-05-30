"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;

  useEffect(() => {
    if (!groupId) return;
    router.replace(`/study-groups/${groupId}/chat`);
  }, [groupId, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900">Opening group...</p>
        <p className="text-sm text-gray-500 mt-1">Taking you straight into the study group.</p>
      </div>
    </div>
  );
}
