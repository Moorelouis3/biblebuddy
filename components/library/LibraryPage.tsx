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
  releaseAt,
  fetchLibraryStudies,
  fetchProgressByStudy,
  withTotals,
  type LibraryStudy,
  type StudyProgress,
} from "../../lib/libraryCatalog";
import LoadFailedNotice from "../LoadFailedNotice";
import { getLiveCommunityEvent, getUpcomingCommunityEvent, upcomingEventHref } from "../../lib/communityEvents";
import { cardTint } from "../../lib/cardTints";

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
  /**
   * Buddies in each study, keyed by devotional id (and the Bible in One Year
   * shelf id), from /api/library/counts. Empty until it loads; if it never
   * does, the holders show no number and fall back to title order - never a
   * zero that is not true.
   */
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    // Absolute: a relative fetch never resolves inside the app shell.
    void fetch(`${window.location.origin}/api/library/counts`)
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { counts?: Record<string, number> } | null) => {
        if (!cancelled && body?.counts) setCounts(body.counts);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      // Four reads used to queue behind one another although only the last
      // two need anything from an earlier one (the user id), so the shelf
      // waited four round trips for what takes two (audit 2026-11-15).
      // Each pair is started together and then awaited in the old order, not
      // through Promise.all, so a read that throws still fails at the same
      // point it always did: studies that loaded stay on screen, and progress
      // that loaded is kept, when a later read is the one that fails.
      // The empty catch only stops a second failure being reported as
      // unhandled; the await below still throws into the catch at the bottom.
      const userRequest = supabase.auth.getUser();
      userRequest.catch(() => {});
      const rows = await fetchLibraryStudies();
      if (cancelled) return;
      setStudies(rows);
      setFailed(rows.length === 0);

      const { data } = await userRequest;
      const userId = data.user?.id;
      const positionRequest = fetchBibleYearPosition(userId ?? null);
      positionRequest.catch(() => {});
      if (userId) {
        const p = await fetchProgressByStudy(userId);
        if (!cancelled) setProgress(p);
      }
      const position = await positionRequest;
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

  /**
   * The shelf, in Louis's default order (2026-11-21): "the one coming out next
   * should be first then the current study then bible in one year then most
   * popular to least".
   *
   * - next: the upcoming community study, else the study that releases soonest.
   * - current: the live community study, else the reader's most recent one.
   * - then Bible in One Year (All Studies only; it has no category).
   * - then every other study by Buddies, most first, title to break a tie.
   */
  const shelf = useMemo(() => {
    const now = new Date();
    type Entry = {
      id: string;
      title: string;
      cover: string | null;
      totalDays: number;
      comingSoon: boolean;
      label: string | null;
      completedDays: number;
      isComplete: boolean;
      percent: number;
      nextDay: number;
      releaseMs: number | null;
    };
    const entries: Entry[] = filtered.map((study) => {
      const p = withTotals(progress[study.id], study.total_days);
      const { comingSoon, label } = availability(study, p.completedDays > 0, now);
      const release = releaseAt(study);
      return {
        id: study.id,
        title: study.title,
        cover: study.cover_image || null,
        totalDays: study.total_days,
        comingSoon,
        label,
        completedDays: p.completedDays,
        isComplete: p.isComplete,
        percent: p.percent,
        nextDay: p.nextDay,
        releaseMs: release ? release.getTime() : null,
      };
    });
    if (category === "all" && bibleYear) {
      const read = bibleYear.highestReadDay;
      entries.push({
        id: BIBLE_YEAR_SHELF_ID,
        title: BIBLE_YEAR_SHELF_TITLE,
        cover: BIBLE_YEAR_SHELF_COVER,
        totalDays: BIBLE_YEAR_TOTAL_DAYS,
        comingSoon: false,
        label: null,
        completedDays: read,
        isComplete: read >= BIBLE_YEAR_TOTAL_DAYS,
        percent: Math.round((read / BIBLE_YEAR_TOTAL_DAYS) * 100),
        nextDay: bibleYear.planDay ?? 1,
        releaseMs: null,
      });
    }

    const ids = new Set(entries.map((e) => e.id));
    const upcomingEvent = getUpcomingCommunityEvent(now);
    const soonest = entries
      .filter((e) => e.comingSoon && e.releaseMs !== null)
      .sort((a, b) => (a.releaseMs ?? 0) - (b.releaseMs ?? 0))[0];
    const nextId =
      upcomingEvent && ids.has(upcomingEvent.devotionalId) ? upcomingEvent.devotionalId : soonest?.id ?? null;
    const liveEvent = getLiveCommunityEvent(now);
    const currentId =
      liveEvent && ids.has(liveEvent.devotionalId) && liveEvent.devotionalId !== nextId
        ? liveEvent.devotionalId
        : inFlight.find(({ study }) => ids.has(study.id) && study.id !== nextId)?.study.id ?? null;

    const rank = (e: Entry) => (e.id === nextId ? 0 : e.id === currentId ? 1 : e.id === BIBLE_YEAR_SHELF_ID ? 2 : 3);
    entries.sort(
      (a, b) => rank(a) - rank(b) || (counts[b.id] ?? 0) - (counts[a.id] ?? 0) || a.title.localeCompare(b.title),
    );
    return entries.map((e) => ({
      ...e,
      seat: e.id === nextId ? ("next" as const) : e.id === currentId ? ("current" as const) : null,
      live: Boolean(liveEvent && e.id === liveEvent.devotionalId),
    }));
  }, [filtered, progress, category, bibleYear, inFlight, counts]);

  /** A shelf tile: the study's own guide page. */
  const openStudy = (id: string) => {
    // A community study that has not opened yet goes to its sign-up page, in
    // both modes, until its start date. After that this is null and the tile
    // opens the study like every other one.
    const signUp = upcomingEventHref(id);
    if (signUp) {
      router.push(signUp);
      return;
    }
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
    const signUp = upcomingEventHref(id);
    if (signUp) {
      router.push(signUp);
      return;
    }
    if (embedded && onStudySelect) {
      onStudySelect(id);
      return;
    }
    router.push(`/devotionals/${id}`);
  };

  return (
    <div className={`bb-cv-scope mx-auto w-full max-w-3xl ${embedded ? "px-0 pb-5" : "px-4 py-5 md:py-8"}`}>
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
          // Each study in its own holder, like the dashboard bookshelf
          // (Louis, 2026-11-21). bb-cv-book and its data-tone are the same
          // hooks the shelf uses, so a Bible Cover skins both alike.
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {shelf.map((entry, index) => {
              const tint = cardTint(index);
              const buddies = counts[entry.id] ?? 0;
              const tone =
                entry.seat === "next"
                  ? "upcoming"
                  : entry.live
                    ? "live"
                    : entry.comingSoon
                      ? "soon"
                      : entry.isComplete
                        ? "done"
                        : entry.seat === "current"
                          ? "current"
                          : "other";
              const badge =
                entry.seat === "next"
                  ? { text: "Upcoming Study", icon: "🗓️", bg: "#6d3fd4" }
                  : entry.live
                    ? { text: "Live Group Study", icon: null, bg: "#b91c1c" }
                    : entry.comingSoon
                      ? { text: "Coming Soon", icon: "🗓️", bg: "#6d3fd4" }
                      : entry.isComplete
                        ? { text: "Study Completed", icon: "✔", bg: "#1f8f54" }
                        : entry.seat === "current"
                          ? { text: "Currently Reading", icon: "📖", bg: "#5b3fd4" }
                          : null;
              const grey = entry.comingSoon || entry.seat === "next";
              return (
                <li
                  key={entry.id}
                  data-tone={tone}
                  className="bb-cv-book flex flex-col rounded-2xl border p-2 shadow-sm transition motion-safe:duration-200 hover:shadow-md"
                  style={{ backgroundColor: tint.bg, borderColor: entry.seat === "next" ? "#b79cf3" : tint.border }}
                >
                  <button
                    type="button"
                    onClick={() => openStudy(entry.id)}
                    className="group flex flex-1 flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)]"
                  >
                    <span className="relative block">
                      {badge ? (
                        <span
                          className="bb-cv-badge absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-black text-white shadow-md"
                          style={{ backgroundColor: badge.bg }}
                        >
                          {badge.icon ? (
                            <span aria-hidden>{badge.icon}</span>
                          ) : (
                            <span aria-hidden className="bb-shelf-live-dot h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                          {badge.text}
                        </span>
                      ) : null}
                      <span className="block overflow-hidden rounded-xl shadow-[0_6px_16px_rgba(16,33,58,0.2)]">
                        {entry.cover ? (
                          // Covers are real artwork at mixed sizes; object-cover on a
                          // fixed 2:3 frame keeps the shelf even without squashing one.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={entry.cover}
                            alt={entry.title}
                            loading={index < 4 ? "eager" : "lazy"}
                            className={`aspect-[2/3] w-full object-cover ${grey ? "opacity-70 grayscale" : ""}`}
                          />
                        ) : (
                          <span className="flex aspect-[2/3] w-full items-center justify-center bg-[var(--bb-surface-soft,#eef2f7)] px-2 text-center text-[11px] font-black text-[var(--bb-text-muted,#6b7280)]">
                            {entry.title}
                          </span>
                        )}
                      </span>
                    </span>

                    {/* Two lines reserved, so the rows under the titles line up. */}
                    <span className="bb-cv-book-title mt-2 line-clamp-2 min-h-[2.5em] text-[13px] font-black leading-tight text-[var(--bb-text-primary,#111827)]">
                      {entry.title}
                    </span>

                    <span className="bb-cv-book-body mt-1 block">
                      <span className="block text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                        {entry.totalDays} Days
                      </span>
                      {buddies > 0 ? (
                        <span className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                          <span aria-hidden>👥</span>
                          {new Intl.NumberFormat().format(buddies)} {buddies === 1 ? "Buddy" : "Buddies"}{" "}
                          {entry.seat === "next" ? "joined" : "studying"}
                        </span>
                      ) : null}
                      {entry.comingSoon && entry.label ? (
                        <span className="bb-cv-hl mt-1 block text-[11px] font-black text-[#a57d2c]">{entry.label}</span>
                      ) : entry.completedDays > 0 ? (
                        <>
                          <span className="bb-cv-track mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/70">
                            <span
                              className="bb-cv-fill block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)]"
                              style={{ width: `${entry.percent}%` }}
                            />
                          </span>
                          {entry.isComplete ? (
                            <span className="bb-cv-ok mt-1 block text-[11px] font-bold text-[#2f8f5b]">✅ Completed</span>
                          ) : (
                            <span className="mt-1 block text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                              Day {entry.nextDay} of {entry.totalDays}
                            </span>
                          )}
                        </>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
