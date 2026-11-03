"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import {
  availability,
  bibleYearShelfStudy,
  fetchProgressByStudy,
  fetchStudyById,
  isBibleYearStudyId,
  withTotals,
  BIBLE_YEAR_TOTAL_CHAPTERS,
  type LibraryStudy,
  type StudyProgress,
} from "../../lib/libraryCatalog";
import { fetchBibleYearPosition } from "../../lib/bibleYearProgress";
import {
  AmazonBookCta,
  Disclosure,
  HowItWorks,
  ReadersCard,
  guideFeatures,
} from "./studyGuideShared";

/**
 * The second screen of the Library: one study guide.
 *
 * Cover and title up top, then the two CTAs, then the dropdowns. Louis,
 * 2026-10-17: "remove the what u get section, add it to the drop downs, and
 * the about this study, on all studies" - the prose used to sit open between
 * the buttons and the people, pushing everything down for a reader who had
 * already decided. It is all still here, a tap away.
 *
 * Start Studying Free uses the existing study route, so somebody already
 * enrolled is never asked to enrol again - they get Continue Studying and
 * their saved day instead.
 *
 * 2026-11-03: this page is now the template for every guide, Bible in One
 * Year included. Its parts live in ./studyGuideShared so the plan's overview
 * can use the same ones rather than a second copy. Nothing about how it looks
 * changed in that move - Louis: "wisdom of proverbs is the Template!"
 */
export default function StudyDetailPage({ studyId }: { studyId: string }) {
  const router = useRouter();
  const [study, setStudy] = useState<LibraryStudy | null>(null);
  const [progress, setProgress] = useState<StudyProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const isBibleYear = isBibleYearStudyId(studyId);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id;

      // Bible in One Year has no devotionals row and no devotional_progress:
      // its catalog entry is built in memory and its progress comes from
      // bible_year_day_progress. See lib/libraryCatalog.
      if (isBibleYear) {
        const row = bibleYearShelfStudy();
        const position = await fetchBibleYearPosition(userId ?? null);
        if (cancelled) return;
        setStudy(row);
        setProgress({
          completedDays: position.completedDays,
          nextDay: position.planDay ?? 1,
          percent: Math.min(100, Math.round((position.completedDays / row.total_days) * 100)),
          isComplete: position.planFinished && position.completedDays >= row.total_days,
          lastActivityAt: null,
        });
        setLoading(false);
        return;
      }

      const row = await fetchStudyById(studyId);
      if (cancelled) return;
      setStudy(row);

      if (userId && row) {
        const all = await fetchProgressByStudy(userId);
        if (!cancelled) setProgress(withTotals(all[row.id], row.total_days));
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [studyId, isBibleYear]);

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
  const started = p.completedDays > 0;
  const { comingSoon, label } = availability(study, started);

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
   *
   * Bible in One Year follows the same rule and lands on its own overview,
   * which carries the Continue shortcut into the right day.
   */
  const primaryHref = isBibleYear
    ? `/library/${study.id}/progress`
    : `/plan?view=bible_studies&study=${encodeURIComponent(study.id)}`;

  // The plan's extra fact, as metadata rather than a change to the hierarchy:
  // 1,189 chapters is what makes 365 days the whole Bible and not a sampler.
  const features = isBibleYear
    ? [
        ...guideFeatures(study.total_days),
        ["📜", `All ${BIBLE_YEAR_TOTAL_CHAPTERS.toLocaleString()} chapters of the Bible`] as [string, string],
      ]
    : guideFeatures(study.total_days);

  const readersPath = isBibleYear
    ? "/api/bible-year/readers"
    : `/api/devotionals/${study.id}/readers`;

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
          className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] focus-visible:ring-offset-2 ${
            comingSoon
              ? "cursor-not-allowed bg-[var(--bb-surface-soft,#f1f5fa)] text-[var(--bb-text-muted,#6b7280)]"
              : "bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] shadow-lg shadow-[#2f7fe8]/20 hover:opacity-95"
          }`}
        >
          <span aria-hidden>📖</span>
          {primaryLabel}
        </button>

        <AmazonBookCta url={study.paperback_url} guideTitle={study.title} placement="library_detail" />
      </div>

      <div className="mt-3">
        {study.description ? (
          <Disclosure icon="📝" title="About This Study" subtitle="What this study is, and who it is for">
            <p className="text-[15px] leading-relaxed text-[var(--bb-text-secondary,#2c3e55)]">
              {study.description}
            </p>
          </Disclosure>
        ) : null}

        <HowItWorks totalDays={study.total_days} />
      </div>

      <ReadersCard readersPath={readersPath} title={study.title} />
    </div>
  );
}
