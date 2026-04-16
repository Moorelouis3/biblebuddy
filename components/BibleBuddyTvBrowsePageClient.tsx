"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { bibleBuddyTvTitles, type BibleBuddyTvCategory } from "../lib/bibleBuddyTvContent";
import {
  bibleBuddyTvBrowseOptions,
  getBrowsePageDescription,
  getBrowsePageHref,
  getBrowsePageLabel,
  getBrowsePageTitle,
  getBrowseSubcategories,
  getTitlesForBrowseCategory,
  matchesBrowseSubcategory,
  type BibleBuddyTvBrowseKey,
} from "../lib/bibleBuddyTvBrowse";

const CAROLINA_BLUE = "#4B9CD3";
const CAROLINA_BLUE_SOFT = "#EAF5FC";
const MY_LIST_STORAGE_KEY = "bbtv-my-list";

type ShelfTitle = (typeof bibleBuddyTvTitles)[number];

function PosterShelf({
  titles,
  showProgress = false,
  getProgressPercent,
}: {
  titles: ShelfTitle[];
  showProgress?: boolean;
  getProgressPercent: (titleId: string) => number;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(titles.length > 0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setCanScrollLeft(container.scrollLeft > 8);
      setCanScrollRight(container.scrollLeft < maxScrollLeft - 8);
    };

    updateScrollState();
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [titles]);

  function scrollShelf(direction: "left" | "right") {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = Math.max(container.clientWidth * 0.82, 220);
    container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div ref={scrollRef} className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar md:mx-0 md:px-0">
        {titles.map((title) => (
          <Link key={title.id} href={`/biblebuddy-tv/shows/${title.slug}`} className="w-[138px] shrink-0 snap-start md:w-[184px]">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="relative aspect-[2/3]">
                <Image src={title.poster} alt={`${title.title} poster`} fill className="object-cover" sizes="(max-width: 768px) 138px, 184px" />
              </div>
              {showProgress ? (
                <div className="px-3 pb-3 pt-2">
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full" style={{ width: `${getProgressPercent(title.id)}%`, backgroundColor: CAROLINA_BLUE }} />
                  </div>
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

      {canScrollLeft ? (
        <button
          type="button"
          onClick={() => scrollShelf("left")}
          aria-label="Scroll shelf left"
          className="absolute left-1 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg font-bold text-gray-900 shadow-md backdrop-blur sm:flex"
        >
          ‹
        </button>
      ) : null}

      {canScrollRight ? (
        <button
          type="button"
          onClick={() => scrollShelf("right")}
          aria-label="Scroll shelf right"
          className="absolute right-1 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg font-bold text-gray-900 shadow-md backdrop-blur sm:flex"
        >
          ›
        </button>
      ) : null}
    </div>
  );
}

export default function BibleBuddyTvBrowsePageClient({
  browseKey,
  initialSubcategory,
}: {
  browseKey: Exclude<BibleBuddyTvBrowseKey, "home">;
  initialSubcategory?: string;
}) {
  const router = useRouter();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingFeatured, setIsDraggingFeatured] = useState(false);
  const [myListIds, setMyListIds] = useState<string[]>([]);
  const [showAllSubcategories, setShowAllSubcategories] = useState(false);
  const dragStartXRef = useRef<number | null>(null);

  const liveTitles = useMemo(() => bibleBuddyTvTitles.filter((title) => title.badge !== "Coming Soon"), []);
  const featuredTitles = useMemo(() => {
    const randomized = [...liveTitles].sort(() => Math.random() - 0.5);
    return randomized.slice(0, Math.min(6, randomized.length));
  }, [liveTitles]);

  const subcategories = browseKey === "my-list" ? [] : getBrowseSubcategories(browseKey);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory || subcategories[0]?.id || "popular");

  useEffect(() => {
    if (subcategories.length) {
      const next = subcategories.find((subcategory) => subcategory.id === initialSubcategory)?.id || subcategories[0].id;
      setSelectedSubcategory(next);
    }
  }, [browseKey, initialSubcategory]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(MY_LIST_STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as string[];
      if (Array.isArray(parsed)) setMyListIds(parsed);
    } catch (error) {
      console.error("[BibleBuddyTvBrowsePageClient] Could not load My List:", error);
    }
  }, []);

  useEffect(() => {
    if (featuredTitles.length <= 1 || isDraggingFeatured) return;
    const intervalId = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredTitles.length);
    }, 10000);
    return () => window.clearInterval(intervalId);
  }, [featuredTitles.length, isDraggingFeatured]);

  function handleFeaturedDragStart(clientX: number) {
    dragStartXRef.current = clientX;
    setIsDraggingFeatured(true);
    setDragOffset(0);
  }

  function handleFeaturedDragMove(clientX: number) {
    if (dragStartXRef.current === null) return;
    setDragOffset(clientX - dragStartXRef.current);
  }

  function handleFeaturedDragEnd() {
    if (dragStartXRef.current === null) return;
    const swipeThreshold = 70;
    if (dragOffset <= -swipeThreshold) {
      setFeaturedIndex((prev) => (prev + 1) % featuredTitles.length);
    } else if (dragOffset >= swipeThreshold) {
      setFeaturedIndex((prev) => (prev - 1 + featuredTitles.length) % featuredTitles.length);
    }
    dragStartXRef.current = null;
    setDragOffset(0);
    setIsDraggingFeatured(false);
  }

  function getProgressPercent(titleId: string) {
    const progressMap: Record<string, number> = {
      "gospel-of-john-movie": 22,
      "moses-movie": 61,
      "joseph-movie": 43,
      "promised-land": 18,
      "the-chosen": 34,
    };
    return progressMap[titleId] ?? 28;
  }

  function handleBrowseSelection(next: BibleBuddyTvBrowseKey) {
    if (next === "home") {
      router.push("/biblebuddy-tv");
      return;
    }
    router.push(getBrowsePageHref(next));
  }

  const categoryTitles =
    browseKey === "my-list"
      ? liveTitles.filter((title) => myListIds.includes(title.id))
      : getTitlesForBrowseCategory(browseKey);

  const activeTitles =
    browseKey === "my-list"
      ? categoryTitles
      : categoryTitles.filter((title) => matchesBrowseSubcategory(browseKey, selectedSubcategory, title.id));

  const extraSections =
    browseKey === "my-list"
      ? []
      : subcategories
          .filter((subcategory) => subcategory.id !== selectedSubcategory)
          .slice(0, 3)
          .map((subcategory) => ({
            ...subcategory,
            titles: categoryTitles.filter((title) => matchesBrowseSubcategory(browseKey, subcategory.id, title.id)),
          }))
          .filter((section) => section.titles.length > 0);

  const visibleSubcategories = showAllSubcategories ? subcategories : subcategories.slice(0, 5);
  const pageTitle = getBrowsePageTitle(browseKey);
  const pageDescription = getBrowsePageDescription(browseKey);
  const activeSubcategoryLabel = subcategories.find((subcategory) => subcategory.id === selectedSubcategory)?.label ?? "Popular";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Bible Buddy TV</h1>
          <p className="text-gray-600">Bible shows, movies, sermons, documentaries, and story-based video content inside Bible Buddy.</p>
        </div>

        <section className="mt-6 md:hidden">
          <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
            <div
              className={`flex ${isDraggingFeatured ? "" : "transition-transform duration-500 ease-out"}`}
              style={{ transform: `translateX(calc(-${featuredIndex * 100}% + ${dragOffset}px))` }}
              onTouchStart={(event) => handleFeaturedDragStart(event.touches[0].clientX)}
              onTouchMove={(event) => handleFeaturedDragMove(event.touches[0].clientX)}
              onTouchEnd={handleFeaturedDragEnd}
              onTouchCancel={handleFeaturedDragEnd}
            >
              {featuredTitles.map((featuredTitle) => (
                <div key={featuredTitle.id} className="min-w-full p-3">
                  <Link href={`/biblebuddy-tv/shows/${featuredTitle.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                      <Image src={featuredTitle.poster} alt={`${featuredTitle.title} poster`} fill className="object-cover" sizes="100vw" />
                    </div>
                  </Link>
                  <div className="px-1 pt-3 text-center">
                    <h2 className="text-[2rem] font-black tracking-[0.12em] text-gray-900">{featuredTitle.title}</h2>
                    <p className="mt-2 text-sm font-medium text-gray-500">{featuredTitle.rating} • {featuredTitle.runtime}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Link href={`/biblebuddy-tv/shows/${featuredTitle.slug}`} className="rounded-xl px-4 py-3 text-base font-semibold text-white transition" style={{ backgroundColor: CAROLINA_BLUE }}>
                        ▶ Play
                      </Link>
                      <Link href={getBrowsePageHref("my-list")} className="rounded-xl bg-gray-100 px-4 py-3 text-base font-semibold text-gray-800 transition hover:bg-gray-200">
                        + My List
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {featuredTitles.map((featuredTitle, index) => (
              <button
                key={featuredTitle.id}
                type="button"
                onClick={() => setFeaturedIndex(index)}
                aria-label={`Show featured title ${featuredTitle.title}`}
                className={`h-2.5 rounded-full transition-all ${index === featuredIndex ? "w-8" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`}
                style={index === featuredIndex ? { backgroundColor: CAROLINA_BLUE } : undefined}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:block">
          <div
            className="overflow-hidden rounded-[24px] border border-gray-200 bg-gradient-to-r via-white to-[#fff8ef]"
            style={{ backgroundImage: `linear-gradient(to right, ${CAROLINA_BLUE_SOFT}, white, #fff8ef)` }}
          >
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${featuredIndex * 100}%)` }}>
              {featuredTitles.map((featuredTitle) => (
                <div key={featuredTitle.id} className="min-w-full p-4 md:p-5">
                  <div className="grid gap-5 md:grid-cols-[180px_1fr] md:items-center">
                    <Link href={`/biblebuddy-tv/shows/${featuredTitle.slug}`} className="mx-auto block max-w-[180px] md:mx-0">
                      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:scale-[1.01] hover:shadow-md">
                        <div className="relative aspect-[4/5]">
                          <Image src={featuredTitle.poster} alt={`${featuredTitle.title} poster`} fill className="object-cover" sizes="180px" />
                        </div>
                      </div>
                    </Link>

                    <div>
                      <p className="text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>Featured Right Now</p>
                      <h2 className="mt-1 text-2xl font-bold text-gray-900">{featuredTitle.title}</h2>
                      <p className="mt-2 text-sm text-gray-600">{featuredTitle.year} • {featuredTitle.rating} • {featuredTitle.runtime}</p>
                      <p className="mt-4 text-sm leading-relaxed text-gray-700">{featuredTitle.overview}</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link href={`/biblebuddy-tv/shows/${featuredTitle.slug}`} className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition" style={{ backgroundColor: CAROLINA_BLUE }}>
                          Play
                        </Link>
                        <Link href={getBrowsePageHref("my-list")} className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200">
                          + My List
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {featuredTitles.map((featuredTitle, index) => (
              <button
                key={featuredTitle.id}
                type="button"
                onClick={() => setFeaturedIndex(index)}
                aria-label={`Show featured title ${featuredTitle.title}`}
                className={`h-2.5 rounded-full transition-all ${index === featuredIndex ? "w-8" : "w-2.5 bg-gray-300 hover:bg-gray-400"}`}
                style={index === featuredIndex ? { backgroundColor: CAROLINA_BLUE } : undefined}
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="relative max-w-sm">
            <select
              value={browseKey}
              onChange={(event) => handleBrowseSelection(event.target.value as BibleBuddyTvBrowseKey)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:ring-2"
              style={{ ["--tw-ring-color" as string]: CAROLINA_BLUE }}
            >
              {bibleBuddyTvBrowseOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-bold" style={{ color: CAROLINA_BLUE }}>
              ▾
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>{getBrowsePageLabel(browseKey)}</p>
          <h2 className="mt-1 text-3xl font-bold text-gray-900">{pageTitle}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">{pageDescription}</p>
        </section>

        {browseKey === "my-list" ? (
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My List</h2>
            </div>
            {categoryTitles.length ? (
              <PosterShelf titles={categoryTitles} getProgressPercent={getProgressPercent} />
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                Your list is empty right now. Add titles from the featured card or any detail page and they will show up here.
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {visibleSubcategories.map((subcategory) => {
                    const active = subcategory.id === selectedSubcategory;
                    return (
                      <button
                        key={subcategory.id}
                        type="button"
                        onClick={() => setSelectedSubcategory(subcategory.id)}
                        className="rounded-full border px-4 py-2 text-sm font-semibold transition"
                        style={
                          active
                            ? { borderColor: CAROLINA_BLUE, backgroundColor: CAROLINA_BLUE_SOFT, color: CAROLINA_BLUE }
                            : undefined
                        }
                      >
                        {subcategory.label}
                      </button>
                    );
                  })}
                  {subcategories.length > 5 ? (
                    <button
                      type="button"
                      onClick={() => setShowAllSubcategories((prev) => !prev)}
                      className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                    >
                      {showAllSubcategories ? "Show less" : "Load more"}
                    </button>
                  ) : null}
                </div>

                <div className="relative min-w-[220px]">
                  <select
                    value={selectedSubcategory}
                    onChange={(event) => setSelectedSubcategory(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:ring-2"
                    style={{ ["--tw-ring-color" as string]: CAROLINA_BLUE }}
                    aria-label={`Choose a ${pageTitle} subcategory`}
                  >
                    {subcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>{subcategory.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-bold" style={{ color: CAROLINA_BLUE }}>
                    ▾
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{activeSubcategoryLabel} {pageTitle}</h2>
              </div>
              {activeTitles.length ? (
                <PosterShelf titles={activeTitles} getProgressPercent={getProgressPercent} />
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                  Nothing is in this subcategory yet.
                </div>
              )}
            </section>

            {extraSections.map((section) => (
              <section key={section.id} className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{section.label} {pageTitle}</h2>
                </div>
                <PosterShelf titles={section.titles} getProgressPercent={getProgressPercent} />
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
