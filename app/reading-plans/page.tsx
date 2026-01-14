"use client";

import Link from "next/link";

interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string | null;
}

const ACTIVE_PLANS: ReadingPlan[] = [
  {
    id: "bible-buddy",
    title: "The Bible Buddy Reading Plan",
    subtitle: "A story-focused journey through Scripture",
    coverImage: "/images/Thebiblebuddyreadingplan.png",
  },
  {
    id: "bible-in-one-year",
    title: "Bible in One Year",
    subtitle: "Read through the entire Bible in 365 days",
    coverImage: "/images/bibleinoneyear.png",
  },
];

// Visual placeholders for future plans (not clickable yet)
const UPCOMING_PLANS: ReadingPlan[] = [
  {
    id: "upcoming-chronological",
    title: "Chronological Bible Journey",
    subtitle: "Read the story of Scripture in historical order",
    coverImage: "/images/placeholder-reading-plan.png",
  },
];

export default function ReadingPlansPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Bible Reading Plans</h1>

        {/* Intro blurb (lightweight, similar tone to Devotionals intro) */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm mb-6 px-6 py-4">
          <p className="text-gray-800 text-sm leading-relaxed">
            Bible Reading Plans help you move through Scripture in a guided order —
            not by adding anything new, but by reusing the same Bible pages you already know.
            Pick a plan, follow the flow, and let the story unfold one chapter at a time.
          </p>
        </div>

        {/* If we ever have zero plans, show a simple message */}
        {ACTIVE_PLANS.length === 0 ? (
          <div className="text-gray-500">
            No reading plans available yet. Check back soon!
          </div>
        ) : (
          <>
            {/* Mobile: vertical list */}
            <div className="flex flex-col md:hidden gap-6">
              {/* Active plans (clickable) */}
              {ACTIVE_PLANS.map((plan) => (
                <Link
                  key={plan.id}
                  href={`/reading-plans/${plan.id}`}
                  className="block w-full"
                >
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 cursor-pointer">
                    {plan.coverImage && (
                      <img
                        src={plan.coverImage}
                        alt={`${plan.title} cover`}
                        className="w-full h-auto rounded-lg object-contain mb-3"
                      />
                    )}
                    <h2 className="text-lg font-semibold text-gray-900">
                      {plan.title}
                    </h2>
                    <p className="text-sm text-gray-700 mt-1">
                      {plan.subtitle}
                    </p>
                  </div>
                </Link>
              ))}

              {/* Upcoming (visual only) */}
              {UPCOMING_PLANS.map((plan) => (
                <div key={plan.id} className="block w-full">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 opacity-75">
                    {plan.coverImage && (
                      <img
                        src={plan.coverImage}
                        alt={`${plan.title} cover`}
                        className="w-full h-auto rounded-lg object-contain mb-3"
                      />
                    )}
                    <h2 className="text-lg font-semibold text-gray-900">
                      {plan.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Coming soon
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: grid layout similar to Devotionals */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {/* Active plans (clickable) */}
              {ACTIVE_PLANS.map((plan) => (
                <Link
                  key={plan.id}
                  href={`/reading-plans/${plan.id}`}
                  className="block w-full max-w-xs"
                >
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                    {plan.coverImage && (
                      <img
                        src={plan.coverImage}
                        alt={`${plan.title} cover`}
                        className="w-full h-auto rounded-lg object-contain mb-3"
                      />
                    )}
                    <h2 className="text-lg font-semibold text-gray-900">
                      {plan.title}
                    </h2>
                    <p className="text-sm text-gray-700 mt-1">
                      {plan.subtitle}
                    </p>
                  </div>
                </Link>
              ))}

              {/* Upcoming (visual only) */}
              {UPCOMING_PLANS.map((plan) => (
                <div key={plan.id} className="block w-full max-w-xs">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 opacity-75">
                    {plan.coverImage && (
                      <img
                        src={plan.coverImage}
                        alt={`${plan.title} cover`}
                        className="w-full h-auto rounded-lg object-contain mb-3"
                      />
                    )}
                    <h2 className="text-lg font-semibold text-gray-900">
                      {plan.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Coming soon
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


