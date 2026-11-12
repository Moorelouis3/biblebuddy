"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { fetchBibleYearPosition, BIBLE_YEAR_TOTAL_DAYS } from "../../lib/bibleYearProgress";
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
import LoadFailedNotice from "../LoadFailedNotice";

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
type LibraryPageProps = {
  /**
   * Rendered inside the app's Library tab rather than as its own page.
   *
   * It is the same bookshelf either way. Before 2026-11-12 the tab rendered
   * the OLD shelf instead - app/devotionals/page.tsx, headed "Plans", with the
   * DEVOTIONALS / ARTICLES strip - so backing out of a study landed you on a
   * screen that had been replaced in October and that the Library tab itself
   * never showed. Louis found it on The Tempting of Jesus: "it sends you back
   * to the old library page that has the three different the devotionals...
   * get rid of the old library page."
   */
  embedded?: boolean;
  /**
   * Required with `embedded`: the tab swaps the study in beneath itself
   * instead of navigating, so the dashboard keeps its shell and Back still
   * comes back here.
   */
  onStudySelect?: (studyId: string) => void;
};

export default function LibraryPage({ embedded = false, onStudySelect }: LibraryPageProps = {}) {
  const router = useRouter();
  const [studies, setStudies] = useState<LibraryStudy[]>([]);
  const [progress, setProgress] = useState<Record<string, StudyProgress>>({});
  const [category, setCategory] = useState("all");
  const [bibleYear, setBibleYear] = useState<{ planDay: number | null; highestReadDay: number } | null>(null);
  const [loading, setLoading] = useState(true);
  /**
   * Nothing came back, or the read threw. Either way: say so, offer the button.
   *
   * This used to be set only when the studies array came back empty, and the
   * message told the reader to pull down to refresh. Since the auth-lock fix
   * a read can also abort after 30 seconds, and the catch below is what keeps
   * that from leaving the four grey covers pulsing forever.
   */
  const [failed, setFailed] = useState(false);
  /** Bumped by Try Again; it is in the effect's deps, so the load re-runs. */
  const [reloadKey, setReloadKey] = useState(0);

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
    })().catch((error: unknown) => {
      if (cancelled) return;
      console.warn("[LIBRARY] Could not load the shelf:", error);
      setFailed(true);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  /** Try Again: back to the skeleton, then run the load once more. */
  function retryLoad() {
    setFailed(false);
    setLoading(true);
    setReloadKey((k) => k + 1);
  }

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

  /** A shelf tile: the study's own guide page. */
  const openStudy = (id: string) => {
    // The Bible in One Year shelf tile is not a devotional row, so it has no
    // study to swap in - it keeps its own page in both modes.
    if (embedded && onStudySelect && id !== BIBLE_YEAR_SHELF_ID) {
      onStudySelect(id);
      return;
    }
    router.push(`/library/${id}`);
  };

  /** Continue Studying: straight to the day list, never to an intro. */
  const openStudyDays = (id: string) => {
    if (embedded && onStudySelect) {
      onStudySelect(id);
      return;
    }
    router.push(`/devotionals/${id}`);
  };

  return (
    <div className={`mx-auto w-full max-w-3xl ${embedded ? "px-0 pb-5" : "px-4 py-5 md:py-8"}`}>
      <h1 className="text-3xl font-black text-[var(--bb-text-primary,#111827)] md:text-4xl">Library</h1>
      <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">
        Bible Studies to help you grow your faith.
      </p>

      {/* Filters scroll sideways rather than wrapping, so a narrow phone keeps one row. */}
      <div
        className={`mt-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          embedded ? "" : "-mx-4 px-4"
        }`}
      >
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
                onClick={() => openStudyDays(study.id)}
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
          <LoadFailedNotice className="mt-4" message="Couldn't load the studies." onRetry={retryLoad} />
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
            {/* Bible in One Year sits on the shelf like a book and now opens
                like one: the same detail page every other guide opens, not its
                old hero-and-365-cards screen. Louis, 2026-11-03: "wisdom of
                proverbs is the Template!" The plan itself, its days and its
                progress are untouched - only the way in changed. It carries no
                category, so it shows under All Studies only. */}
            {category === "all" && bibleYear ? (
              <button
                type="button"
                onClick={() => openStudy(BIBLE_YEAR_SHELF_ID)}
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
