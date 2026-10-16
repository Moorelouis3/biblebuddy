"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import {
  availability,
  fetchProgressByStudy,
  fetchStudyById,
  withTotals,
  type LibraryStudy,
  type StudyProgress,
} from "../../lib/libraryCatalog";

/**
 * The second screen of the Library: one study guide.
 *
 * Cover and title up top, then the two CTAs, then About This Study and What
 * You'll Get. Start Studying Free uses the existing study route, so somebody
 * already enrolled is never asked to enrol again - they get Continue Studying
 * and their saved day instead.
 */
export default function StudyDetailPage({ studyId }: { studyId: string }) {
  const router = useRouter();
  const [study, setStudy] = useState<LibraryStudy | null>(null);
  const [progress, setProgress] = useState<StudyProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const row = await fetchStudyById(studyId);
      if (cancelled) return;
      setStudy(row);

      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id;
      if (userId && row) {
        const all = await fetchProgressByStudy(userId);
        if (!cancelled) setProgress(withTotals(all[row.id], row.total_days));
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [studyId]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl animate-pulse px-4 py-6">
        <div className="h-5 w-24 rounded bg-[var(--bb-surface-soft,#f1f5fa)]" />
        <div className="mt-5 flex gap-4">
          <div className="h-48 w-32 rounded-2xl bg-[var(--bb-surface-soft,#f1f5fa)]" />
          <div className="flex-1 space-y-3 pt-2">
            <div className="h-6 w-3/4 rounded bg-[var(--bb-surface-soft,#f1f5fa)]" />
            <div className="h-4 w-1/2 rounded bg-[var(--bb-surface-soft,#f1f5fa)]" />
          </div>
        </div>
      </div>
    );
  }

  if (!study || !study.is_published) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10 text-center">
        <p className="text-base font-bold text-[var(--bb-text-primary,#111827)]">
          That study is not on the shelf.
        </p>
        <Link href="/library" className="mt-4 inline-block text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
          ← Library
        </Link>
      </div>
    );
  }

  const p = progress ?? withTotals(undefined, study.total_days);
  const { comingSoon, label } = availability(study);
  const started = p.completedDays > 0;

  const primaryLabel = comingSoon
    ? label ?? "Coming soon"
    : p.isComplete
      ? "Review the Study"
      : started
        ? "Continue Studying"
        : "Start Studying Free";

  /**
   * Always the study's own page, the one listing every day - never a deep link
   * into a single day. Louis, 2026-10-16: "it takes me to proverbs 8 instead of
   * the main proverbs devotional page with all the days, that's how it's done."
   * The shelf's Continue Studying card is the shortcut straight into a day;
   * this button is the way in to the study itself.
   */
  const primaryHref = `/plan?view=bible_studies&study=${encodeURIComponent(study.id)}`;

  const features: Array<[string, string]> = [
    ["📘", `${study.total_days} Days`],
    ["📄", "Daily readings"],
    ["💬", "Simple explanations"],
    ["🌱", "Practical application"],
    ["❤️", "Grow closer to God"],
  ];

  // Only promises the app actually keeps.
  const whatYouGet = [
    `${study.total_days} days of guided study`,
    "Daily Scripture and clear explanations",
    "Reflection questions",
    "Practical application for real life",
    "Track your progress in the app",
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-5 md:py-8">
      <Link
        href="/library"
        className="inline-flex items-center gap-1.5 text-sm font-black text-[var(--bb-text-secondary,#5f6368)] hover:text-[var(--bb-accent,#2f7fe8)]"
      >
        ← Library
      </Link>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:gap-6">
        {study.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={study.cover_image}
            alt={study.title}
            className="mx-auto w-40 shrink-0 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] object-cover shadow-sm sm:mx-0 sm:w-44"
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-3xl">
            {study.title}
          </h1>
          {study.subtitle ? (
            <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">{study.subtitle}</p>
          ) : null}
          <ul className="mt-4 space-y-2">
            {features.map(([icon, text]) => (
              <li key={text} className="flex items-center gap-2.5 text-sm font-semibold text-[var(--bb-text-primary,#111827)]">
                <span aria-hidden className="text-base">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          disabled={comingSoon}
          onClick={() => router.push(primaryHref)}
          className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-black transition ${
            comingSoon
              ? "cursor-not-allowed bg-[var(--bb-surface-soft,#f1f5fa)] text-[var(--bb-text-muted,#6b7280)]"
              : "bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] shadow-lg shadow-[#2f7fe8]/20 hover:opacity-95"
          }`}
        >
          <span aria-hidden>📖</span>
          {primaryLabel}
        </button>

        {/* Never a broken checkout: without a configured URL this says so. */}
        {study.paperback_url ? (
          <a
            href={study.paperback_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-card,#ffffff)] px-6 py-4 text-base font-black text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
          >
            <span aria-hidden>🛒</span>
            Buy the Paperback
          </a>
        ) : (
          <div className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-6 py-4 text-base font-black text-[var(--bb-text-muted,#6b7280)]">
            <span aria-hidden>🛒</span>
            Paperback coming soon
          </div>
        )}
      </div>

      {study.description ? (
        <section className="mt-8">
          <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">About This Study</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--bb-text-secondary,#5f6368)]">
            {study.description}
          </p>
        </section>
      ) : null}

      <section className="mt-7 rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-5 py-6">
        <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">What You&rsquo;ll Get</h2>
        <ul className="mt-3 space-y-2.5">
          {whatYouGet.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] font-semibold text-[var(--bb-text-primary,#111827)]">
              <span aria-hidden className="mt-0.5 text-base">✅</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
