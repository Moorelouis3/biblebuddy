"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BibleStudiesSeriesList from "@/components/BibleStudiesSeriesList";
import { ACTION_TYPE } from "../../lib/actionTypes";
import {
  BIBLE_STUDIES_CATALOG,
  getBibleStudySeriesCover,
  normalizeBibleStudySeriesTitle,
} from "../../lib/bibleStudiesCatalog";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";
import { supabase } from "../../lib/supabaseClient";

type BibleStudyRow = {
  id: string;
  title: string;
};

export default function BibleStudiesPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loadingStudies, setLoadingStudies] = useState(true);
  const [studyRows, setStudyRows] = useState<BibleStudyRow[]>([]);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setUserId(user?.id ?? null);
      const meta: any = user?.user_metadata || {};
      setUsername(
        meta.firstName ||
          meta.first_name ||
          (user?.email ? user.email.split("@")[0] : null) ||
          null,
      );
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.guided_study_tool_opened,
      actionLabel: "Bible Studies Page",
      dedupeKey: "bible-studies-page-viewed",
    }).catch((error) => console.error("[NAV] Failed to track Bible Studies page view:", error));
  }, [userId, username]);

  useEffect(() => {
    let cancelled = false;

    async function loadStudies() {
      setLoadingStudies(true);

      const { data } = await supabase
        .from("devotionals")
        .select("id, title")
        .in("title", BIBLE_STUDIES_CATALOG.map((study) => study.title));

      if (cancelled) return;

      setStudyRows((data || []) as BibleStudyRow[]);
      setLoadingStudies(false);
    }

    void loadStudies();

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    return BIBLE_STUDIES_CATALOG.map((study) => {
      const matchingStudy =
        studyRows.find(
          (row) => normalizeBibleStudySeriesTitle(row.title) === normalizeBibleStudySeriesTitle(study.title),
        ) ?? null;

      return {
        key: study.key,
        title: study.title,
        subtitle: study.subtitle,
        coverSrc: getBibleStudySeriesCover(study.title),
        statusLabel: "Bible Study",
        statusTone: "preview" as const,
        detail: study.description,
        footerLeft: `${study.totalChapters} ${study.totalChapters === 1 ? "chapter" : "chapters"}`,
        footerRight: matchingStudy ? "Open Study" : "Coming Soon",
        onClick: () => {
          router.push(matchingStudy ? `/devotionals/${matchingStudy.id}` : "/devotionals");
        },
      };
    });
  }, [router, studyRows]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <nav className="text-sm text-gray-500">
          <Link href="/dashboard" className="transition hover:text-gray-700">Dashboard</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/guided-studies" className="transition hover:text-gray-700">Bible Study Tools</Link>
          <span className="mx-2">&gt;</span>
          <span className="font-medium text-gray-800">Bible Studies</span>
        </nav>

        <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Bible Studies</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Bible Studies</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
            Choose a Bible study and walk chapter by chapter through the full Bible Buddy flow: intro, Scripture
            reading, deep notes, trivia, Scrambled, and reflection.
          </p>
        </div>

        <BibleStudiesSeriesList
          items={cards}
          loading={loadingStudies}
          emptyMessage="No Bible studies have been added yet."
        />
      </div>
    </div>
  );
}
