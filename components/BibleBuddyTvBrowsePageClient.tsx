"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { bibleBuddyTvTitles } from "../lib/bibleBuddyTvContent";
import {
  getBrowsePageDescription,
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

function PosterGrid({ titles }: { titles: ShelfTitle[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {titles.map((title) => (
        <Link key={title.id} href={`/biblebuddy-tv/shows/${title.slug}`} className="block">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative aspect-[2/3]">
              <Image
                src={title.poster}
                alt={`${title.title} poster`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            <div className="px-3 py-3">
              <p className="line-clamp-2 text-sm font-semibold text-gray-900">{title.title}</p>
              <p className="mt-1 text-xs text-gray-500">
                {title.year} • {title.runtime}
              </p>
            </div>
          </div>
        </Link>
      ))}
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
  const [myListIds, setMyListIds] = useState<string[]>([]);
  const [showAllSubcategories, setShowAllSubcategories] = useState(false);

  const liveTitles = useMemo(() => bibleBuddyTvTitles.filter((title) => title.badge !== "Coming Soon"), []);
  const subcategories = browseKey === "my-list" ? [] : getBrowseSubcategories(browseKey);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory || subcategories[0]?.id || "popular");

  useEffect(() => {
    if (subcategories.length) {
      const next = subcategories.find((subcategory) => subcategory.id === initialSubcategory)?.id || subcategories[0].id;
      setSelectedSubcategory(next);
    }
  }, [browseKey, initialSubcategory, subcategories]);

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

  const categoryTitles =
    browseKey === "my-list"
      ? liveTitles.filter((title) => myListIds.includes(title.id))
      : getTitlesForBrowseCategory(browseKey);

  const activeTitles =
    browseKey === "my-list"
      ? categoryTitles
      : categoryTitles.filter((title) => matchesBrowseSubcategory(browseKey, selectedSubcategory, title.id));

  const visibleSubcategories = showAllSubcategories ? subcategories : subcategories.slice(0, 5);
  const pageTitle = getBrowsePageTitle(browseKey);
  const pageDescription = getBrowsePageDescription(browseKey);
  const activeSubcategoryLabel = subcategories.find((subcategory) => subcategory.id === selectedSubcategory)?.label ?? "Popular";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold">{pageTitle}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600">{pageDescription}</p>
        </div>

        {browseKey === "my-list" ? (
          <section className="mt-8">
            {categoryTitles.length ? (
              <PosterGrid titles={categoryTitles} />
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
                <div className="min-w-[220px]">
                  <p className="mb-2 text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>
                    {pageTitle} Buckets
                  </p>
                  <div className="relative">
                    <select
                      value={selectedSubcategory}
                      onChange={(event) => setSelectedSubcategory(event.target.value)}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm font-medium text-gray-800 shadow-sm outline-none transition focus:ring-2"
                      style={{ ["--tw-ring-color" as string]: CAROLINA_BLUE }}
                      aria-label={`Choose a ${pageTitle} subcategory`}
                    >
                      {subcategories.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory.label}
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

                {subcategories.length > 5 ? (
                  <button
                    type="button"
                    onClick={() => setShowAllSubcategories((prev) => !prev)}
                    className="self-start rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                  >
                    {showAllSubcategories ? "Show less buckets" : `Show ${subcategories.length - visibleSubcategories.length} more buckets`}
                  </button>
                ) : null}
              </div>

            </section>

            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeSubcategoryLabel} {pageTitle}
                </h2>
              </div>
              {activeTitles.length ? (
                <PosterGrid titles={activeTitles} />
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
                  Nothing is in this subcategory yet.
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
