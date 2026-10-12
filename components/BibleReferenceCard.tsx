"use client";

/**
 * "Look It Up" - the home screen entry to the three reference lists.
 *
 * The lists themselves are a huge asset (~3,200 people, ~2,270 places,
 * ~1,100 keywords) but they sat three clicks down, under Plans > Bible Study
 * Tools > Bible References, where nobody found them. Louis, 2026-10-12: put
 * it on the main page so people can click it and use it.
 *
 * The search box is the point. Typing a name jumps straight to that entry's
 * pop-up on the relevant page, so the common case - "who is Jabez" - is one
 * box and one click instead of picking a category and hunting an alphabet.
 * Matching happens in /api/bible-reference/search because the three lists are
 * about 220 KB; see that route for why they stay on the server.
 */

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type ReferenceKind = "person" | "place" | "keyword";

type ReferenceHit = {
  label: string;
  kind: ReferenceKind;
  href: string;
};

type Counts = Record<ReferenceKind, number>;

const KIND_BADGE: Record<ReferenceKind, { label: string; className: string }> = {
  person: { label: "Person", className: "bg-[#ede7fb] text-[#5b4a9e]" },
  place: { label: "Place", className: "bg-[#fdebd8] text-[#9a5a21]" },
  keyword: { label: "Word", className: "bg-[#fce0e0] text-[#a33a3a]" },
};

const CATEGORIES: Array<{
  kind: ReferenceKind;
  title: string;
  blurb: string;
  href: string;
  containerClassName: string;
  titleClassName: string;
  blurbClassName: string;
}> = [
  {
    kind: "person",
    title: "People",
    blurb: "Who they were",
    href: "/people-in-the-bible",
    containerClassName: "border-[#ddd6f3] bg-[#f4f1fd]",
    titleClassName: "text-[#3f3270]",
    blurbClassName: "text-[#6b5ba8]",
  },
  {
    kind: "place",
    title: "Places",
    blurb: "Where it happened",
    href: "/places-in-the-bible",
    // #fdf0e2 rather than the #fff3e6 the Trivia card uses: globals.css
    // repaints any bg-[#fff...] class with --bb-card in dark mode, which left
    // this one tile bare while People and Keywords kept their tint.
    containerClassName: "border-[#f4dcc8] bg-[#fdf0e2]",
    titleClassName: "text-[#6d3f17]",
    blurbClassName: "text-[#9a5a21]",
  },
  {
    kind: "keyword",
    title: "Keywords",
    blurb: "What the word means",
    href: "/keywords-in-the-bible",
    containerClassName: "border-[#f3d2d2] bg-[#fdeded]",
    titleClassName: "text-[#7a2626]",
    blurbClassName: "text-[#a33a3a]",
  },
];

/** Rounded down to the hundred, so a label never overstates the list. */
function roundedCount(value: number): string {
  if (value < 100) return String(value);
  return `${Math.floor(value / 100) * 100}+`;
}

export default function BibleReferenceCard({
  onEvent,
}: {
  /** Same tracker the other home sections use; optional so the card renders anywhere. */
  onEvent?: (event: string, payload: Record<string, unknown>) => void;
}) {
  const [query, setQuery] = useState("");
  /**
   * The last answer the server gave, tagged with the query it answered. Kept
   * as one tagged value rather than separate results/total/searching flags so
   * nothing has to be cleared when the query changes - a stale answer simply
   * stops matching `trimmed` and is ignored. That keeps every setState inside
   * a fetch callback, where it belongs, instead of in an effect body.
   */
  const [matches, setMatches] = useState<{ query: string; results: ReferenceHit[]; total: number }>({
    query: "",
    results: [],
    total: 0,
  });
  const [counts, setCounts] = useState<Counts | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const trimmed = query.trim();
  const isAnswered = matches.query === trimmed;
  const results = isAnswered ? matches.results : [];
  const total = isAnswered ? matches.total : 0;
  const searching = trimmed.length >= 2 && !isAnswered;

  // Real counts for the tile labels. A failed call just leaves the tiles
  // without a number rather than showing a guessed one.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/bible-reference/search?q=")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled || !data?.counts) return;
        setCounts(data.counts as Counts);
      })
      .catch(() => {
        /* tiles stay countless */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounced search. Every keystroke aborts the request in flight so a slow
  // early query cannot land after a later one and overwrite it. A query too
  // short to search just never fetches; the panel stays closed for it anyway.
  useEffect(() => {
    if (trimmed.length < 2) return;

    const controller = new AbortController();

    const timer = setTimeout(() => {
      fetch(`/api/bible-reference/search?q=${encodeURIComponent(trimmed)}`, {
        signal: controller.signal,
      })
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
          if (controller.signal.aborted) return;
          setMatches({
            query: trimmed,
            results: (data?.results || []) as ReferenceHit[],
            total: Number(data?.total) || 0,
          });
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          // A failed lookup reads as "nothing found" rather than spinning.
          setMatches({ query: trimmed, results: [], total: 0 });
        });
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed]);

  // Clicking away closes the result list without clearing what was typed.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent | TouchEvent) {
      const node = containerRef.current;
      if (node && !node.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  const placeholder = useMemo(() => {
    if (!counts) return "Search a name, place or word";
    const everything = counts.person + counts.place + counts.keyword;
    return `Search ${roundedCount(everything)} names, places and words`;
  }, [counts]);

  const showPanel = open && trimmed.length >= 2;

  return (
    <section aria-labelledby="home-reference-heading">
      <div className="mb-2 flex items-end justify-between">
        <h2
          id="home-reference-heading"
          className="text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]"
        >
          Look It Up
        </h2>
        <Link
          href="/bible-references"
          onClick={() => onEvent?.("home_reference_see_all_click", {})}
          className="text-sm font-bold text-[var(--bb-accent,#2f7fe8)]"
        >
          See All
        </Link>
      </div>

      <div
        ref={containerRef}
        className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-5"
      >
        <p className="text-sm font-semibold text-[var(--bb-text-primary,#111827)]">
          Hit a name you don&apos;t know?
        </p>
        <p className="mt-0.5 text-xs text-[var(--bb-text-muted,#6b7280)]">
          Type it here and Louis explains who, where or what it is.
        </p>

        <div className="relative mt-3">
          <label htmlFor="home-reference-search" className="sr-only">
            Search people, places and keywords in the Bible
          </label>
          <input
            id="home-reference-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#eef2f7)] px-4 py-3 text-sm text-[var(--bb-text-primary,#111827)] outline-none transition placeholder:text-[var(--bb-text-muted,#9ca3af)] focus:border-[var(--bb-accent,#2f7fe8)]"
          />

          {showPanel ? (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-lg">
              {results.length === 0 ? (
                <p className="px-4 py-3 text-xs text-[var(--bb-text-muted,#6b7280)]">
                  {searching ? "Searching..." : `Nothing matches "${trimmed}" yet.`}
                </p>
              ) : (
                <>
                  <ul className="divide-y divide-[var(--bb-card-border,#dbe7f4)]">
                    {results.map((hit) => (
                      <li key={`${hit.kind}:${hit.label}`}>
                        <Link
                          href={hit.href}
                          onClick={() => {
                            setOpen(false);
                            onEvent?.("home_reference_result_click", { kind: hit.kind, label: hit.label });
                          }}
                          className="flex items-center justify-between gap-3 px-4 py-2.5 transition hover:bg-[var(--bb-surface-soft,#eef2f7)]"
                        >
                          <span className="min-w-0 truncate text-sm font-semibold text-[var(--bb-text-primary,#111827)]">
                            {hit.label}
                          </span>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${KIND_BADGE[hit.kind].className}`}
                          >
                            {KIND_BADGE[hit.kind].label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {total > results.length ? (
                    <p className="px-4 py-2 text-[11px] text-[var(--bb-text-muted,#6b7280)]">
                      Showing {results.length} of {total} matches - keep typing to narrow it down.
                    </p>
                  ) : null}
                </>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {CATEGORIES.map((category) => (
            <Link
              key={category.kind}
              href={category.href}
              onClick={() => onEvent?.("home_reference_category_click", { kind: category.kind })}
              className={`rounded-xl border p-3 text-center outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99] ${category.containerClassName}`}
            >
              <span className={`block text-sm font-black ${category.titleClassName}`}>{category.title}</span>
              {counts ? (
                <span className={`mt-0.5 block text-[11px] font-bold ${category.blurbClassName}`}>
                  {roundedCount(counts[category.kind])}
                </span>
              ) : null}
              <span className={`mt-0.5 block text-[10px] font-semibold ${category.blurbClassName}`}>
                {category.blurb}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
