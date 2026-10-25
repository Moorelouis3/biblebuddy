"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { bibleYearHref, fetchBibleYearPosition, BIBLE_YEAR_TOTAL_DAYS } from "../../lib/bibleYearProgress";
import {
  BIBLE_YEAR_SHELF_COVER,
  BIBLE_YEAR_SHELF_ID,
  BIBLE_YEAR_SHELF_TITLE,
  LIBRARY_CATEGORIES,
  availability,
  fetchLibraryStudies,
  fetchProgressByStudy,
  withTotals,
  type LibraryStudy,
  type StudyProgress,
} from "../../lib/libraryCatalog";

/**
 * The Library bookshelf - what the Plans tab used to be.
 *
 * Built 2026-10-16 from the approved two-screen mockup. The old page opened on
 * a promotional banner, four feature bullets and a Bible in One Year /
 * Devotionals / Articles tab strip, so the books themselves were most of a
 * screen down. This opens on the books.
 *
 * Everything shown is real: studies and their covers, categories and
 * availability come from the devotionals table, and progress comes from
 * devotional_progress. A study nobody has started shows no progress rather
 * than a decorative empty bar.
 */
export default function LibraryPage() {
  const router = useRouter();
  const [studies, setStudies] = useState<LibraryStudy[]>([]);
  const [progress, setProgress] = useState<Record<string, StudyProgress>>({});
  const [category, setCategory] = useState("all");
  const [bibleYear, setBibleYear] = useState<{ planDay: number | null; highestReadDay: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const rows = await fetchLibraryStudies();
      if (cancelled) return;
      setStudies(rows);
      setFailed(rows.length === 0);

      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id;
      if (userId) {
        const p = await fetchProgressByStudy(userId);
        if (!cancelled) setProgress(p);
      }
      const position = await fetchBibleYearPosition(userId ?? null);
      if (!cancelled) setBibleYear({ planDay: position.planDay, highestReadDay: position.highestReadDay });
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /** Only offer a filter if something published actually carries that category. */
  const visibleCategories = useMemo(() => {
    const present = new Set(studies.map((s) => s.category).filter(Boolean) as string[]);
    return LIBRARY_CATEGORIES.filter((c) => c.value === "all" || present.has(c.value));
  }, [studies]);

  const filtered = useMemo(
    () => (category === "all" ? studies : studies.filter((s) => s.category === category)),
    [studies, category],
  );

  /**
   * Continue Studying: started, not finished, most recently touched first.
   * Hidden entirely when there is nothing in flight, rather than showing an
   * empty card.
   */
  const inFlight = useMemo(() => {
    return studies
      .map((s) => ({ study: s, p: withTotals(progress[s.id], s.total_days) }))
      .filter(({ p }) => p.completedDays > 0 && !p.isComplete)
      .sort((a, b) => (b.p.lastActivityAt || "").localeCompare(a.p.lastActivityAt || ""));
  }, [studies, progress]);

  const openStudy = (id: string) => router.push(`/library/${id}`);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-5 md:py-8">
      <h1 className="text-3xl font-black text-[var(--bb-text-primary,#111827)] md:text-4xl">Library</h1>
      <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">
        Bible Studies to help you grow your faith.
      </p>

      {/* Filters scroll sideways rather than wrapping, so a narrow phone keeps one row. */}
      <div className="-mx-4 mt-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2">
          {visibleCategories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              aria-pressed={category === c.value}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                category === c.value
                  ? "bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)]"
                  : "bg-[var(--bb-surface-soft,#f1f5fa)] text-[var(--bb-text-primary,#111827)] hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {inFlight.length > 0 ? (
        <section className="mt-7">
          <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">Continue Studying</h2>
          <div className="mt-3 space-y-3">
            {inFlight.map(({ study, p }) => (
              <button
                key={study.id}
                type="button"
                // The study's own page, where every day is listed - not just
                // the next one. Same reason as the dashboard shelf: jumping
                // straight to the next day left no way back to the days
                // before it. Never back through an intro or a signup step.
                onClick={() => router.push(`/devotionals/${study.id}`)}
                className="flex w-full items-center gap-4 rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3 text-left shadow-sm transition hover:border-[var(--bb-accent,#2f7fe8)]"
              >
                {study.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={study.cover_image}
                    alt=""
                    className="h-24 w-16 shrink-0 rounded-xl object-cover"
                  />
                ) : null}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-black text-[var(--bb-text-primary,#111827)]">
                    {study.title}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
                    Day {p.nextDay} of {study.total_days}
                  </span>
                  <span className="mt-2 block h-2 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#f1f5fa)]">
                    <span
                      className="block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)] transition-all duration-500"
                      style={{ width: `${p.percent}%` }}
                    />
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-black text-[var(--bb-accent,#2f7fe8)]">
                    Continue Studying →
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">All Study Guides</h2>
          {!loading && filtered.length > 0 ? (
            <span className="text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
              {filtered.length + (category === "all" && bibleYear ? 1 : 0)} studies
            </span>
          ) : null}
        </div>

        {loading ? (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] w-full rounded-2xl bg-[var(--bb-surface-soft,#f1f5fa)]" />
                <div className="mt-2 h-4 w-3/4 rounded bg-[var(--bb-surface-soft,#f1f5fa)]" />
              </div>
            ))}
          </div>
        ) : failed ? (
          <p className="mt-4 rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-6 text-center text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
            We could not load the studies just now. Pull down to refresh, or try again in a moment.
          </p>
        ) : filtered.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-6 text-center text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
            Nothing in this category yet. Try All Studies.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
            {filtered.map((study) => {
              const p = withTotals(progress[study.id], study.total_days);
              const { comingSoon, label } = availability(study, p.completedDays > 0);
              return (
                <button
                  key={study.id}
                  type="button"
                  onClick={() => openStudy(study.id)}
                  className="group text-left"
                >
                  <div className="overflow-hidden rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f1f5fa)] shadow-sm transition group-hover:border-[var(--bb-accent,#2f7fe8)]">
                    {study.cover_image ? (
                      // Covers are real artwork at mixed sizes; object-cover on a
                      // fixed 2:3 frame keeps the shelf even without squashing one.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={study.cover_image}
                        alt={study.title}
                        loading="lazy"
                        className={`aspect-[2/3] w-full object-cover ${comingSoon ? "opacity-70 grayscale" : ""}`}
                      />
                    ) : (
                      <div className="flex aspect-[2/3] w-full items-center justify-center px-2 text-center text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                        {study.title}
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-black leading-tight text-[var(--bb-text-primary,#111827)]">
                    {study.title}
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                    {study.total_days} Days
                  </p>
                  {comingSoon ? (
                    <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-[#a57d2c]">{label}</p>
                  ) : p.completedDays > 0 ? (
                    <>
                      <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#f1f5fa)]">
                        <span
                          className="block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)]"
                          style={{ width: `${p.percent}%` }}
                        />
                      </span>
                      <p className="mt-1 text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                        {p.isComplete ? "Completed" : `Day ${p.nextDay} of ${study.total_days}`}
                      </p>
                    </>
                  ) : null}
                </button>
              );
            })}
            {/* Bible in One Year sits on the shelf like a book, but it is a
                reading plan: the card is new, the pages behind it are the same
                ones it always opened. It carries no category, so it shows
                under All Studies only. */}
            {category === "all" && bibleYear ? (
              <button
                type="button"
                onClick={() => router.push(bibleYearHref())}
                className="group text-left"
              >
                <div className="overflow-hidden rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f1f5fa)] shadow-sm transition group-hover:border-[var(--bb-accent,#2f7fe8)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={BIBLE_YEAR_SHELF_COVER}
                    alt={BIBLE_YEAR_SHELF_TITLE}
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm font-black leading-tight text-[var(--bb-text-primary,#111827)]">
                  {BIBLE_YEAR_SHELF_TITLE}
                </p>
                <p className="mt-0.5 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                  {BIBLE_YEAR_TOTAL_DAYS} Days
                </p>
                {bibleYear.highestReadDay > 0 ? (
                  <>
                    <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#f1f5fa)]">
                      <span
                        className="block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)]"
                        style={{
                          width: `${Math.round((bibleYear.highestReadDay / BIBLE_YEAR_TOTAL_DAYS) * 100)}%`,
                        }}
                      />
                    </span>
                    <p className="mt-1 text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                      Day {bibleYear.planDay} of {BIBLE_YEAR_TOTAL_DAYS}
                    </p>
                  </>
                ) : null}
              </button>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
