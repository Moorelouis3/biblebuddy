"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

// Moderation queue (2026-09-21, App Store guideline 1.2). Every report from
// the ⋯ menus on posts, comments, profiles and event members lands here,
// newest first. Apple expects reports to be acted on within 24 hours.

const ADMIN_EMAIL = "moorelouis3@gmail.com";

type Person = { user_id: string; name: string; image: string | null };

type Report = {
  id: string;
  created_at: string;
  content_type: string;
  content_id: string | null;
  reason: string;
  raw_reason: string;
  conversation_id: string | null;
  content_link: string | null;
  content_preview: string | null;
  content_missing: boolean;
  reporter: Person;
  reported: Person;
};

const TYPE_LABEL: Record<string, string> = {
  group_post: "Group post",
  group_comment: "Group comment",
  series_comment: "Bible study reflection",
  comment: "Article comment",
  profile: "Profile",
  event_member: "Event member",
  message: "Direct message",
  unknown: "Other",
};

function when(iso: string) {
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function ageHours(iso: string) {
  return (Date.now() - new Date(iso).getTime()) / 3_600_000;
}

export default function AdminReportsPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [reports, setReports] = useState<Report[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const { data: authData } = await supabase.auth.getUser();
      if ((authData.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
        setAuthorized(false);
        return;
      }
      setAuthorized(true);
      const token = (await supabase.auth.getSession()).data.session?.access_token || "";
      const response = await fetch("/api/admin/reports", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || "Could not load reports.");
      setReports(payload.reports || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load reports.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (authorized === false) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-4 py-8 text-slate-950">
        <h1 className="text-2xl font-black">Reports</h1>
        <p className="mt-2 text-sm font-semibold text-gray-500">This page is only for the Bible Buddy owner.</p>
      </main>
    );
  }

  const recent = (reports || []).filter((report) => ageHours(report.created_at) < 24).length;

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8 text-slate-950">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black">Reports</h1>
          <p className="mt-1 text-sm font-semibold text-gray-500">
            Everything people reported from the ⋯ menus on posts, comments, profiles and event members. Review within 24
            hours. Remove content from its own page (you can delete any post or comment as admin).
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="flex-shrink-0 rounded-full bg-gray-100 px-4 py-1.5 text-sm font-black text-gray-700"
        >
          Refresh
        </button>
      </div>

      {reports ? (
        <p className="mt-4 text-sm font-bold text-gray-700">
          {reports.length} report{reports.length === 1 ? "" : "s"} · {recent} in the last 24 hours
        </p>
      ) : null}

      {error ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      {!reports && !error ? <p className="mt-6 text-sm font-semibold text-gray-500">Loading...</p> : null}
      {reports && reports.length === 0 ? <p className="mt-6 text-sm font-semibold text-gray-500">No reports yet.</p> : null}

      {(reports || []).map((report) => {
        const fresh = ageHours(report.created_at) < 24;
        return (
          <article key={report.id} className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black">
              <span className={`rounded-full px-2.5 py-1 ${fresh ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-700"}`}>
                {TYPE_LABEL[report.content_type] || report.content_type}
              </span>
              <span className="text-gray-500">{when(report.created_at)}</span>
              {fresh ? <span className="rounded-full bg-red-50 px-2 py-0.5 text-red-700">new</span> : null}
            </div>

            <p className="mt-2 whitespace-pre-wrap text-[15px] font-bold">{report.reason || "(no reason)"}</p>

            <p className="mt-2 text-sm">
              <span className="font-black">Reported: </span>
              <Link href={`/profile/${report.reported.user_id}`} className="font-semibold text-blue-700 underline">
                {report.reported.name}
              </Link>
              <span className="text-gray-500"> · by </span>
              <Link href={`/profile/${report.reporter.user_id}`} className="font-semibold text-blue-700 underline">
                {report.reporter.name}
              </Link>
            </p>

            {report.content_preview ? (
              <p className="mt-3 whitespace-pre-wrap rounded-xl bg-gray-50 p-3 text-sm text-gray-800">{report.content_preview}</p>
            ) : null}
            {report.content_missing ? (
              <p className="mt-3 text-xs font-bold text-gray-500">The reported content no longer exists (already deleted).</p>
            ) : null}

            <div className="mt-3 flex flex-wrap gap-3 text-xs font-black">
              {report.content_link ? (
                <Link href={report.content_link} className="rounded-full bg-slate-900 px-3 py-1.5 text-white">
                  Open content
                </Link>
              ) : null}
              <Link href={`/profile/${report.reported.user_id}`} className="rounded-full bg-gray-100 px-3 py-1.5 text-gray-700">
                Reported profile
              </Link>
              {report.content_id ? (
                <span className="rounded-full bg-gray-50 px-3 py-1.5 font-mono font-semibold text-gray-500">{report.content_id}</span>
              ) : null}
            </div>
          </article>
        );
      })}
    </main>
  );
}
