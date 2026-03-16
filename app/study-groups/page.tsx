"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function StudyGroupsPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function openOfficialGroup() {
      const { data } = await supabase
        .from("study_groups")
        .select("id")
        .in("name", ["Bible Buddy Study Group", "Hope Nation"])
        .limit(1)
        .maybeSingle();

      if (cancelled) return;

      if (data?.id) {
        router.replace(`/study-groups/${data.id}/chat`);
        return;
      }

      router.replace("/dashboard");
    }

    openOfficialGroup();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900">Opening Bible Study Group...</p>
        <p className="text-sm text-gray-500 mt-1">Taking you to the official Bible Buddy study group.</p>
      </div>
    </div>
  );
}
