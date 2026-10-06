"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { getCommunityEvent } from "@/lib/communityEvents";

/**
 * The permanent, shareable entry page for The Wisdom of Proverbs.
 *
 * Built 2026-10-06. Until now the only Proverbs links were /study/wisdom-of-proverbs
 * and /events/wisdom-of-proverbs. The first bounced a signed-out visitor to the
 * homepage (it redirects to /devotionals/<id>, which redirects to /dashboard,
 * which the proxy sends to "/"), and the second is a client component, so it
 * could never carry its own link preview. Every blog post, QR code and social
 * share pointing at Proverbs therefore dropped strangers on the generic homepage
 * with a generic preview card.
 *
 * This page is deliberately plain copy plus one decision. It works signed out,
 * explains the study, and sends people to signup carrying the Proverbs
 * destination so they land in the study rather than a dashboard.
 *
 * Everything here is real: the copy comes from lib/communityEvents.ts, and the
 * participant count is the live figure from the public count endpoint. No
 * invented testimonials, results or numbers.
 */

const EVENT_SLUG = "wisdom-of-proverbs";

export default function ProverbsLandingPage() {
  const event = getCommunityEvent(EVENT_SLUG);
  const { userId, loading: authLoading } = useSupabaseUser();
  const [joinedCount, setJoinedCount] = useState<number | null>(null);

  const devotionalId = event?.devotionalId ?? "";
  const studyPath = `/devotionals/${devotionalId}`;
  // Signed out, carry the destination through signup so they arrive in Proverbs.
  // Both /signup and /login honour ?next= (see their nextPath helpers).
  const startHref = userId ? studyPath : `/signup?next=${encodeURIComponent(studyPath)}`;

  useEffect(() => {
    let cancelled = false;
    // Count only - the endpoint never returns names, photos or ids, which is why
    // it is safe to show to a logged out visitor.
    fetch(`/api/community-events/${EVENT_SLUG}/count`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && typeof data?.count === "number") setJoinedCount(data.count);
      })
      .catch(() => {
        // A missing count just hides that line; it must never block the page.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!event) return null;

  const steps = [
    {
      title: "Read or listen",
      body: "Each day opens with a short study of that chapter — read it, or let Bible Buddy read it to you.",
    },
    {
      title: "Read the chapter",
      body: "Then the chapter of Proverbs itself, with study notes beside the text.",
    },
    {
      title: "Take the trivia",
      body: "A few questions on what you just read, so it actually sticks.",
    },
    {
      title: "Join the discussion",
      body: "Answer the day's question and see what everyone else saw in the same chapter.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7faff]">
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-8">
        <div className="overflow-hidden rounded-3xl border border-[#dce7f7] bg-white shadow-sm">
          <Image
            src="/og/wisdom-of-proverbs.png"
            alt="The Wisdom of Proverbs — a free 31-day Bible study from Bible Buddy"
            width={1200}
            height={630}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2f6fd0]">
            Free · 31 days · Go at your own pace
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-[#10213a] sm:text-4xl">
            The Wisdom of Proverbs
          </h1>
          <p className="mt-3 text-base text-[#44566f]">{event.subtitle}</p>
        </div>

        <div className="mt-8 rounded-3xl border border-[#dce7f7] bg-white p-6 sm:p-8">
          <p className="text-base leading-relaxed text-[#2c3e55]">
            Most people never actually study Proverbs. They treat it as a drawer of loose advice — open it,
            grab a line, close it again. But Proverbs does not open with sayings. It opens with a father
            pleading with his son to listen, and he keeps going for nine chapters. The short lines everyone
            quotes do not start until chapter 10, and they land completely differently once you have read
            what comes before them.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#2c3e55]">
            This study walks through all 31 chapters, one a day. You will spend time on your words, your
            money, your temper, your friendships, the things you keep hidden, and the voices you have been
            letting decide your life.
          </p>
          <p className="mt-4 text-base font-semibold text-[#10213a]">{event.evergreenLine}</p>
        </div>

        <div className="mt-6 rounded-3xl border border-[#dce7f7] bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#10213a]">How each day works</h2>
          <ol className="mt-5 space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf1fd] text-sm font-bold text-[#2f6fd0]">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-[#10213a]">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#44566f]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 rounded-3xl border border-[#dce7f7] bg-white p-6 text-center sm:p-8">
          {joinedCount !== null && joinedCount > 0 ? (
            <p className="text-base text-[#2c3e55]">
              <span className="font-bold text-[#10213a]">{joinedCount.toLocaleString()} Bible Buddies</span>{" "}
              have joined this study. You can start yours today.
            </p>
          ) : (
            <p className="text-base text-[#2c3e55]">Start your 31 days whenever you are ready.</p>
          )}

          <Link
            href={startHref}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#2f6fd0] px-8 py-4 text-base font-bold text-white transition hover:bg-[#2559ab] sm:w-auto"
          >
            {userId ? "Open the study" : "Start the Free 31-Day Study"}
          </Link>

          <p className="mt-4 text-sm text-[#5b6c84]">
            A free Bible Buddy account keeps your place and saves your answers.
          </p>

          {!userId && !authLoading ? (
            <p className="mt-2 text-sm text-[#5b6c84]">
              Already have an account?{" "}
              <Link
                href={`/login?next=${encodeURIComponent(studyPath)}`}
                className="font-semibold text-[#2f6fd0] underline"
              >
                Sign in
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
