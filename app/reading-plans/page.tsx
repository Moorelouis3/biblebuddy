"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import UpgradeRequiredModal from "../../components/UpgradeRequiredModal";

interface ReadingPlan {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string | null;
}

const ACTIVE_PLANS: ReadingPlan[] = [
  {
    id: "bible-in-one-year",
    title: "Bible in One Year",
    subtitle: "Read through the entire Bible in 365 days",
    coverImage: "/images/bibleinoneyear.png",
  },
  {
    id: "bible-buddy",
    title: "The Bible Buddy Reading Plan",
    subtitle: "A story-focused journey through Scripture",
    coverImage: "/images/Thebiblebuddyreadingplan.png",
  },
];


export default function ReadingPlansPage() {
  const router = useRouter();
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [showPlanLocked, setShowPlanLocked] = useState(false);

  useEffect(() => {
    async function loadMembership() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsPaid(false);
        return;
      }

      const { data } = await supabase
        .from("profile_stats")
        .select("is_paid")
        .eq("user_id", user.id)
        .maybeSingle();

      setIsPaid(!!data?.is_paid);
    }

    loadMembership();
  }, []);

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
                plan.id === "bible-buddy" ? (
                  (() => {
                    const isLocked = isPaid === false;
                    const cardClasses = `relative bg-white border border-gray-200 rounded-xl shadow-sm p-4 transition-all duration-200 cursor-pointer ${
                      isLocked
                        ? "cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-[1.01]"
                    }`;
                    return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => {
                      if (!isLocked) {
                        router.push(`/reading-plans/${plan.id}`);
                        return;
                      }
                      setShowPlanLocked(true);
                    }}
                    className="block w-full text-left"
                  >
                    <div className={cardClasses}>
                      <div>
                        {plan.coverImage && (
                          <div className="relative mb-3">
                            <img
                              src={plan.coverImage}
                              alt={`${plan.title} cover`}
                              className="w-full h-auto rounded-lg object-contain"
                            />
                            {isLocked && (
                              <div className="pointer-events-none absolute inset-0 rounded-lg bg-black/50 flex items-center justify-center">
                                <div
                                  className="text-white text-lg font-semibold"
                                  style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                                >
                                  🔒 Pro Users Only
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <h2 className="text-lg font-semibold text-gray-900">
                          {plan.title}
                        </h2>
                        <p className="text-sm text-gray-700 mt-1">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                    );
                  })()
                ) : (
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
                )
              ))}

            </div>

            {/* Desktop: grid layout similar to Devotionals */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {/* Active plans (clickable) */}
              {ACTIVE_PLANS.map((plan) => (
                plan.id === "bible-buddy" ? (
                  (() => {
                    const isLocked = isPaid === false;
                    const cardClasses = `relative bg-white border border-gray-200 rounded-xl shadow-sm p-5 transition-all duration-200 cursor-pointer ${
                      isLocked
                        ? "cursor-not-allowed"
                        : "hover:shadow-xl hover:scale-[1.02]"
                    }`;
                    return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => {
                      if (!isLocked) {
                        router.push(`/reading-plans/${plan.id}`);
                        return;
                      }
                      setShowPlanLocked(true);
                    }}
                    className="block w-full max-w-xs text-left"
                  >
                    <div className={cardClasses}>
                      <div>
                        {plan.coverImage && (
                          <div className="relative mb-3">
                            <img
                              src={plan.coverImage}
                              alt={`${plan.title} cover`}
                              className="w-full h-auto rounded-lg object-contain"
                            />
                            {isLocked && (
                              <div className="pointer-events-none absolute inset-0 rounded-lg bg-black/50 flex items-center justify-center">
                                <div
                                  className="text-white text-lg font-semibold"
                                  style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                                >
                                  🔒 Pro Users Only
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <h2 className="text-lg font-semibold text-gray-900">
                          {plan.title}
                        </h2>
                        <p className="text-sm text-gray-700 mt-1">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                    );
                  })()
                ) : (
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
                )
              ))}
            </div>
          </>
        )}
      </div>

      <UpgradeRequiredModal
        isOpen={showPlanLocked}
        onClose={() => setShowPlanLocked(false)}
      />
    </div>
  );
}


