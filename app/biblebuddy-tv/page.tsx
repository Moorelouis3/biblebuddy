"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  bibleBuddyTvCategories,
  bibleBuddyTvTitles,
  gospelOfJohnMovieTitle,
  josephMovieTitle,
  mosesMovieTitle,
  promisedLandTitle,
  theChosenTitle,
  type BibleBuddyTvCategory,
} from "../../lib/bibleBuddyTvContent";

const CAROLINA_BLUE = "#4B9CD3";
const CAROLINA_BLUE_SOFT = "#EAF5FC";
const CAROLINA_BLUE_BORDER = "#C8E2F3";

const categoryOptions: Array<{ id: BibleBuddyTvCategory; label: string }> = [
  { id: "movies", label: "Movies" },
  { id: "tv", label: "TV Shows" },
  { id: "sermons", label: "Sermons" },
  { id: "documentaries", label: "Documentary" },
  { id: "bible-stories", label: "Cartoons" },
];

function getCategoryCardStyle(category: BibleBuddyTvCategory) {
  switch (category) {
    case "tv":
      return "border-[#C8E2F3] bg-[#EAF5FC]";
    case "movies":
      return "border-[#f0d7b3] bg-[#fff8ef]";
    case "sermons":
      return "border-[#C8E2F3] bg-[#EAF5FC]";
    case "documentaries":
      return "border-[#C8E2F3] bg-[#EAF5FC]";
    case "bible-stories":
      return "border-[#C8E2F3] bg-[#EAF5FC]";
    default:
      return "border-gray-200 bg-white";
  }
}

export default function BibleBuddyTvHomePage() {
  const [activeCategory, setActiveCategory] = useState<BibleBuddyTvCategory>("movies");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingFeatured, setIsDraggingFeatured] = useState(false);
  const dragStartXRef = useRef<number | null>(null);

  const featuredTitles = [gospelOfJohnMovieTitle, mosesMovieTitle, josephMovieTitle, promisedLandTitle, theChosenTitle];
  const filteredTitles = useMemo(
    () => bibleBuddyTvTitles.filter((title) => title.category === activeCategory),
    [activeCategory]
  );
  const myListTitles = bibleBuddyTvTitles.filter((title) => title.inMyList);
  const continueWatchingTitles = bibleBuddyTvTitles.filter((title) => title.continueWatchingLabel);
  const rotatingShelfCategories = useMemo(() => {
    const randomized = [...categoryOptions].sort(() => Math.random() - 0.5);
    return randomized.slice(0, 3);
  }, []);

  useEffect(() => {
    if (featuredTitles.length <= 1) return;
    if (isDraggingFeatured) return;

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

  function renderPosterShelf(
    titles: typeof bibleBuddyTvTitles,
    options?: { showProgress?: boolean; sectionTone?: "default" | "my-list" }
  ) {
    return (
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        {titles.map((title) => (
          <Link
            key={title.id}
            href={`/biblebuddy-tv/shows/${title.slug}`}
            className="w-[138px] shrink-0 snap-start md:w-[184px]"
          >
            <div
              className={`overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                options?.sectionTone === "my-list" ? getCategoryCardStyle(title.category) : "border-gray-200 bg-white"
              }`}
            >
              <div className="relative aspect-[2/3]">
                <Image
                  src={title.poster}
                  alt={`${title.title} poster`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 138px, 184px"
                />
              </div>
              {options?.showProgress ? (
                <div className="px-3 pb-3 pt-2">
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${getProgressPercent(title.id)}%`, backgroundColor: CAROLINA_BLUE }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Bible Buddy TV</h1>
          <p className="text-gray-600">
            Bible shows, movies, sermons, documentaries, and story-based video content inside Bible Buddy.
          </p>
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
                      <Image
                        src={featuredTitle.poster}
                        alt={`${featuredTitle.title} poster`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  </Link>

                  <div className="px-1 pb-2 pt-4 text-center">
                    <h2 className="text-3xl font-black tracking-[0.18em] text-gray-900">{featuredTitle.title}</h2>
                    <p className="mt-2 text-sm font-medium text-gray-500">{featuredTitle.rating} • {featuredTitle.runtime}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Link
                        href={`/biblebuddy-tv/shows/${featuredTitle.slug}`}
                        className="rounded-xl px-4 py-3 text-base font-semibold text-white transition"
                        style={{ backgroundColor: CAROLINA_BLUE }}
                      >
                        ▶ Play
                      </Link>
                      <Link
                        href={`/biblebuddy-tv/shows/${featuredTitle.slug}`}
                        className="rounded-xl bg-gray-100 px-4 py-3 text-base font-semibold text-gray-800 transition hover:bg-gray-200"
                      >
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
                className={`h-2.5 rounded-full transition-all ${
                  index === featuredIndex ? "w-8" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                style={index === featuredIndex ? { backgroundColor: CAROLINA_BLUE } : undefined}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:block md:p-6">
          <div
            className="overflow-hidden rounded-[24px] border border-gray-200 bg-gradient-to-r via-white to-[#fff8ef]"
            style={{ backgroundImage: `linear-gradient(to right, ${CAROLINA_BLUE_SOFT}, white, #fff8ef)` }}
          >
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${featuredIndex * 100}%)` }}
            >
              {featuredTitles.map((featuredTitle) => (
                <div key={featuredTitle.id} className="min-w-full p-4 md:p-6">
                  <div className="grid gap-5 md:grid-cols-[220px_1fr] md:items-center">
                    <Link
                      href={`/biblebuddy-tv/shows/${featuredTitle.slug}`}
                      className="mx-auto block max-w-[220px] md:mx-0"
                    >
                      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:scale-[1.01] hover:shadow-md">
                        <div className="relative aspect-[4/5]">
                          <Image
                            src={featuredTitle.poster}
                            alt={`${featuredTitle.title} poster`}
                            fill
                            className="object-cover"
                            sizes="220px"
                          />
                        </div>
                      </div>
                    </Link>

                    <div>
                      <p className="text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>
                        Featured Right Now
                      </p>
                      <h2 className="mt-1 text-2xl font-bold text-gray-900">{featuredTitle.title}</h2>
                      <p className="mt-2 text-sm text-gray-600">
                        {featuredTitle.year} • {featuredTitle.rating} • {featuredTitle.runtime}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-gray-700">{featuredTitle.overview}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {featuredTitle.searchTags?.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-xs font-medium text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          href={`/biblebuddy-tv/shows/${featuredTitle.slug}`}
                          className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition"
                          style={{ backgroundColor: CAROLINA_BLUE }}
                        >
                          Play
                        </Link>
                        <Link
                          href={`/biblebuddy-tv/shows/${featuredTitle.slug}`}
                          className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                        >
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
                className={`h-2.5 rounded-full transition-all ${
                  index === featuredIndex ? "w-8" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                style={index === featuredIndex ? { backgroundColor: CAROLINA_BLUE } : undefined}
              />
            ))}
          </div>
        </section>

        <section id="tv-categories" className="mt-8">
          <div className="relative max-w-sm">
            <select
              value={activeCategory}
              onChange={(event) => setActiveCategory(event.target.value as BibleBuddyTvCategory)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:ring-2"
              style={{ ["--tw-ring-color" as string]: CAROLINA_BLUE }}
              aria-label="Choose a Bible Buddy TV category"
            >
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <div
              className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-bold"
              style={{ color: CAROLINA_BLUE }}
            >
              ▾
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {bibleBuddyTvCategories.find((category) => category.id === activeCategory)?.description}
          </p>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Continue Watching</h2>
            <span className="text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>
              Bible Buddy TV
            </span>
          </div>
          {renderPosterShelf(continueWatchingTitles, { showProgress: true })}
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My List</h2>
            <span className="text-sm font-semibold text-gray-500">Saved</span>
          </div>
          {renderPosterShelf(myListTitles, { sectionTone: "my-list" })}
        </section>

        {rotatingShelfCategories.map((category) => {
          const shelfTitles = bibleBuddyTvTitles.filter((title) => title.category === category.id);
          if (!shelfTitles.length) return null;

          return (
            <section key={category.id} className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{category.label}</h2>
                <span className="text-sm font-semibold text-gray-500">Browse</span>
              </div>
              {renderPosterShelf(shelfTitles)}
            </section>
          );
        })}
      </div>
    </div>
  );
}

