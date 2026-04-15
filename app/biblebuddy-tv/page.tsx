"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  bibleBuddyTvCategories,
  bibleBuddyTvTitles,
  josephMovieTitle,
  mosesMovieTitle,
  promisedLandTitle,
  theChosenTitle,
  type BibleBuddyTvCategory,
} from "../../lib/bibleBuddyTvContent";

const CAROLINA_BLUE = "#4B9CD3";
const CAROLINA_BLUE_SOFT = "#EAF5FC";
const CAROLINA_BLUE_BORDER = "#C8E2F3";

const mobileCategoryOptions: Array<{ id: BibleBuddyTvCategory; label: string }> = [
  { id: "tv", label: "TV Shows" },
  { id: "movies", label: "Movies" },
  { id: "bible-stories", label: "Animation" },
  { id: "documentaries", label: "Documentary" },
  { id: "sermons", label: "Sermons" },
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
  const [activeCategory, setActiveCategory] = useState<BibleBuddyTvCategory>("tv");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featuredTitles = [mosesMovieTitle, josephMovieTitle, promisedLandTitle, theChosenTitle];
  const filteredTitles = useMemo(
    () => bibleBuddyTvTitles.filter((title) => title.category === activeCategory),
    [activeCategory]
  );
  const myListTitles = bibleBuddyTvTitles.filter((title) => title.inMyList);
  const continueWatchingTitles = featuredTitles.filter((title) => title.continueWatchingLabel);

  useEffect(() => {
    if (featuredTitles.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredTitles.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, [featuredTitles.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav className="text-sm text-gray-500">
          <Link href="/dashboard" className="transition hover:text-gray-700">
            Dashboard
          </Link>
          <span className="mx-2">›</span>
          <span className="font-medium text-gray-800">Bible Buddy TV</span>
        </nav>

        <div className="mt-6">
          <h1 className="mb-2 text-3xl font-bold">Bible Buddy TV</h1>
          <p className="text-gray-600">
            Bible shows, movies, sermons, documentaries, and story-based video content inside Bible Buddy.
          </p>
        </div>

        <section className="mt-6 md:hidden">
          <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${featuredIndex * 100}%)` }}
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
          <div className="md:hidden">
            <div className="relative max-w-xs">
              <select
                value={activeCategory}
                onChange={(event) => setActiveCategory(event.target.value as BibleBuddyTvCategory)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:ring-2"
                style={{ ["--tw-ring-color" as string]: CAROLINA_BLUE }}
                aria-label="Choose a Bible Buddy TV category"
              >
                {mobileCategoryOptions.map((category) => (
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
          </div>

          <div className="hidden flex-wrap gap-3 md:flex">
            {bibleBuddyTvCategories.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "text-white"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  style={isActive ? { backgroundColor: CAROLINA_BLUE } : undefined}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {bibleBuddyTvCategories.find((category) => category.id === activeCategory)?.description}
          </p>
        </section>

        <section className="mt-8 md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Continue Watching</h2>
            <span className="text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>
              Bible Buddy TV
            </span>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
            {continueWatchingTitles.map((title) => (
              <Link
                key={title.id}
                href={`/biblebuddy-tv/shows/${title.slug}`}
                className="w-[138px] shrink-0 snap-start"
              >
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={title.poster}
                      alt={`${title.title} poster`}
                      fill
                      className="object-cover"
                      sizes="138px"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {bibleBuddyTvCategories.find((category) => category.id === activeCategory)?.label}
            </h2>
            <span className="text-sm font-semibold text-gray-500">Browse</span>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
            {filteredTitles.map((title) => (
              <Link
                key={title.id}
                href={`/biblebuddy-tv/shows/${title.slug}`}
                className="w-[138px] shrink-0 snap-start"
              >
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={title.poster}
                      alt={`${title.title} poster`}
                      fill
                      className="object-cover"
                      sizes="138px"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:block md:p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {bibleBuddyTvCategories.find((category) => category.id === activeCategory)?.label}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              This section follows the same simple card flow as the rest of Bible Buddy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
            {filteredTitles.map((title) => (
              <Link key={title.id} href={`/biblebuddy-tv/shows/${title.slug}`} className="block">
                <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-xl md:p-4">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={title.poster}
                      alt={`${title.title} poster`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 45vw, 260px"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-semibold" style={{ color: CAROLINA_BLUE }}>
                      {title.badge}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-gray-900 md:text-lg">{title.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-700 md:text-sm">{title.logline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:block md:p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Continue Watching</h2>
            <p className="mt-1 text-sm text-gray-600">Pick up where you left off inside Bible Buddy.</p>
          </div>

          <Link href={`/biblebuddy-tv/shows/${promisedLandTitle.slug}`} className="block">
            <div
              className="rounded-xl border p-4 transition hover:shadow-md"
              style={{ borderColor: CAROLINA_BLUE_BORDER, backgroundColor: CAROLINA_BLUE_SOFT }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg sm:w-44">
                  <Image
                    src={promisedLandTitle.poster}
                    alt={`${promisedLandTitle.title} poster`}
                    fill
                    className="object-cover"
                    sizes="176px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>
                    Resume Watching
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900">{promisedLandTitle.title}</h3>
                  <p className="mt-1 text-sm text-gray-700">{promisedLandTitle.continueWatchingLabel}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#D9EDF9]">
                    <div className="h-full w-[18%] rounded-full" style={{ backgroundColor: CAROLINA_BLUE }} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        <section className="mt-8 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:block md:p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My List</h2>
            <p className="mt-1 text-sm text-gray-600">Saved shows and collections you want to keep close.</p>
          </div>

          <div className="space-y-3">
            {myListTitles.map((title) => (
              <Link key={title.id} href={`/biblebuddy-tv/shows/${title.slug}`} className="block">
                <div
                  className={`rounded-xl border p-4 shadow-sm transition hover:shadow-md ${getCategoryCardStyle(title.category)}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-black/5">
                      <Image
                        src={title.poster}
                        alt={`${title.title} poster`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-600">{title.badge}</p>
                      <h3 className="mt-1 text-lg font-semibold text-gray-900">{title.title}</h3>
                      <p className="mt-1 text-sm text-gray-700">{title.runtime}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
