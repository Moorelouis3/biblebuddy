"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Buddy = {
  id: string;
  name: string;
  tag: string;
  image: string;
  era: string;
  role: string;
  bio: string;
  keyVerse: string;
};

const BUDDIES: Buddy[] = [
  {
    id: "joseph",
    name: "Joseph",
    tag: "Father of Jesus",
    image: "/bible-buddies/Joseph.png",
    era: "1st century",
    role: "Father, Protector, Parent",
    bio: "Joseph was a humble carpenter God chose to raise Jesus. He listened to God in dreams, protected Mary and the child, and obeyed even when everything felt confusing. His life shows quiet courage, steady faith, and obedience that protects the people God trusts you with.",
    keyVerse: "Matthew 1:24",
  },
  {
    id: "abraham",
    name: "Abraham",
    tag: "Father of Faith",
    image: "/bible-buddies/Abraham.png",
    era: "Around 2000 BC",
    role: "Patriarch, Covenant starter",
    bio: "God called Abraham to leave everything familiar and follow Him. Through Abraham God began the covenant story, promising to bless all nations through his family line. Jesus comes from this family.",
    keyVerse: "Genesis 12:1–3",
  },
  {
    id: "david",
    name: "David",
    tag: "Shepherd King",
    image: "/bible-buddies/David.png",
    era: "Around 1000 BC",
    role: "King of Israel, Psalm writer",
    bio: "David was a shepherd, warrior, and king. He loved God deeply, failed badly, and repented honestly. God promised that one of David’s descendants would sit on an eternal throne. Jesus is that promised King.",
    keyVerse: "2 Samuel 7:12–13",
  },
  {
    id: "moses",
    name: "Moses",
    tag: "Deliverer and Lawgiver",
    image: "/bible-buddies/Moses.png",
    era: "Around 1400 BC",
    role: "Prophet, Leader of Israel",
    bio: "God used Moses to lead Israel out of slavery in Egypt, receive the Ten Commandments, and guide the people through the wilderness. His life points forward to Jesus, the greater Deliverer.",
    keyVerse: "Exodus 3:10–12",
  },
  {
    id: "johnthebaptist",
    name: "John the Baptist",
    tag: "Voice in the Wilderness",
    image: "/bible-buddies/John%20the%20Baptist.png",
    era: "1st century",
    role: "Prophet, Forerunner of Jesus",
    bio: "John preached in the wilderness calling people to repent because the Kingdom of Heaven was near. His whole mission was to prepare the way for Jesus and point people to Him.",
    keyVerse: "John 1:29",
  },
  {
    id: "paul",
    name: "Paul",
    tag: "Missionary to the Nations",
    image: "/bible-buddies/Paul.png",
    era: "1st century",
    role: "Apostle, Church planter, Writer",
    bio: "Paul went from hunting Christians to planting churches all over the Roman world. God used him to write many New Testament letters that help us understand the gospel and how to live it out.",
    keyVerse: "Galatians 2:20",
  },
];

const PAGE_SIZE = 12;

const getBuddyDetailHref = (buddy: Buddy) => {
  // detail pages you already built
  if (["joseph", "abraham", "moses", "paul", "johnthebaptist", "david"].includes(buddy.id)) {
    return `/bible-buddies/${buddy.id}`;
  }
  // others can come later
  return "#";
};

export default function BibleBuddiesPage() {
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const start = pageIndex * PAGE_SIZE;
  const currentPageBuddies = BUDDIES.slice(start, start + PAGE_SIZE);

  const hasPrev = pageIndex > 0;
  const hasNext = start + PAGE_SIZE < BUDDIES.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* HEADER */}
      <header className="w-full pt-4 pb-4 border-b border-gray-200 bg-white/60 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Bible Buddies</h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Pick a Buddy to learn their story.
            </p>
          </div>

        </div>
      </header>

      {/* MAIN CARD */}
      <main className="max-w-5xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
          {/* Intro blurb */}
          <div className="mb-6">
            <p className="text-sm text-gray-700">
              These cards are like character selects in a game. Each one is a
              real person from Scripture. Tap a card to open their profile and
              see how God used them.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {currentPageBuddies.map((buddy) => (
              <button
                key={buddy.id}
                type="button"
                onClick={() => setSelectedBuddy(buddy)}
                className="group bg-gray-50 border border-gray-200 rounded-2xl px-3 py-4 sm:px-4 sm:py-5 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-[3px] transition"
              >
                <div className="flex items-center justify-center w-full h-28 sm:h-32 md:h-36 rounded-2xl overflow-hidden bg-white">
                  <Image
                    src={buddy.image}
                    alt={buddy.name}
                    width={220}
                    height={220}
                    className="object-contain max-h-full w-auto"
                  />
                </div>

                <div className="mt-3">
                  <h2 className="text-sm sm:text-base font-semibold">
                    {buddy.name}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-600 mt-1">
                    {buddy.tag}
                  </p>
                </div>
              </button>
            ))}

            {currentPageBuddies.length < PAGE_SIZE &&
              Array.from({
                length: PAGE_SIZE - currentPageBuddies.length,
              }).map((_, idx) => (
                <div key={`placeholder-${idx}`} className="hidden md:block" />
              ))}
          </div>

          {/* Pagination footer */}
          <div className="mt-6 flex items-center justify-between text-xs sm:text-sm text-blue-600">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => hasPrev && setPageIndex(pageIndex - 1)}
              className={
                hasPrev ? "hover:underline" : "text-gray-300 cursor-default"
              }
            >
              Previous buddies
            </button>

            <button
              type="button"
              disabled={!hasNext}
              onClick={() => hasNext && setPageIndex(pageIndex + 1)}
              className={
                hasNext ? "hover:underline" : "text-gray-300 cursor-default"
              }
            >
              Next buddies
            </button>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {selectedBuddy && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-black/60 shadow-2xl shadow-black/70 p-6 sm:p-7 md:p-8">
            <button
              type="button"
              onClick={() => setSelectedBuddy(null)}
              className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4">
              <div className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 mx-auto sm:mx-0 rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src={selectedBuddy.image}
                  alt={selectedBuddy.name}
                  width={260}
                  height={260}
                  className="object-contain max-h-full w-auto"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                  <span>{selectedBuddy.name}</span>
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedBuddy.tag}
                </p>

                <p className="text-xs sm:text-sm text-gray-700">
                  <span className="font-semibold">Era:</span>{" "}
                  {selectedBuddy.era}
                </p>
                <p className="text-xs sm:text-sm text-gray-700">
                  <span className="font-semibold">Role:</span>{" "}
                  {selectedBuddy.role}
                </p>
                <p className="text-xs sm:text-sm text-gray-700 mt-1">
                  <span className="font-semibold">Key verse:</span>{" "}
                  {selectedBuddy.keyVerse}
                </p>
              </div>
            </div>

            <div className="text-sm leading-relaxed text-gray-800 whitespace-pre-line">
              {selectedBuddy.bio}
            </div>

            <div className="mt-4">
              <Link
                href={getBuddyDetailHref(selectedBuddy)}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline"
              >
                Read more HERE
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
