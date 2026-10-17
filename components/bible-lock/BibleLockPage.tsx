"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BibleLockSettings from "@/components/BibleLockSettings";
import { bibleLockAvailable, UNLOCKING_ACTIONS_SUMMARY } from "@/lib/bibleLock";

/**
 * The Bible lock, explained (Louis, 2026-10-17: "I don't see it as an option
 * on the dashboard - a page of its own explaining it and how to use it").
 *
 * It lived in Settings and rendered nothing at all on anything that could not
 * run it, which is every browser, so most people had no idea it existed. This
 * page explains it everywhere and hands over the real controls where they
 * work.
 *
 * The support check is async and starts unknown, so the switch-on block stays
 * out of the way until the answer is in - better a beat of nothing than a
 * button that turns out to be a lie.
 */

const STEPS = [
  ["Open Settings, or this page, in the Bible Buddy app on your iPhone", "The lock uses Apple's Screen Time, which only exists inside the app."],
  ["Allow it with Face ID", "iPhone asks once. Nothing is locked yet."],
  ["Pick the apps", "Apple's own picker. Choose the ones that usually get you first."],
  ["Lock them", "They stay shielded until you have done today's reading."],
];

export default function BibleLockPage() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    void bibleLockAvailable().then((ok) => {
      if (!cancelled) setAvailable(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 md:py-10">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-black text-[var(--bb-text-secondary,#5f6368)] hover:text-[var(--bb-accent,#2f7fe8)]"
      >
        ← Home
      </Link>

      <header className="mt-5 text-center">
        <span aria-hidden className="text-5xl">
          🔒
        </span>
        <h1 className="mt-3 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Bible Lock</h1>
        <p className="mt-2 text-[15px] font-semibold text-[var(--bb-text-secondary,#5f6368)]">
          Lock the apps that get your attention first, until you have read today.
        </p>
      </header>

      <section className="mt-7 rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-6">
        <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">What it does</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--bb-text-secondary,#2c3e55)]">
          You pick the apps that usually win — the feed, the videos, the game. Bible Buddy shields them.
          They open again the moment you have done today&rsquo;s reading. Not opened the Bible: done the
          reading. Nothing here is unlocked by tapping around for a second.
        </p>
        <p className="mt-4 rounded-2xl bg-[var(--bb-surface-soft,#f3f8ff)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-secondary,#2c3e55)]">
          <span className="block font-black text-[var(--bb-text-primary,#111827)]">What unlocks them</span>
          {UNLOCKING_ACTIONS_SUMMARY}
        </p>
      </section>

      <section className="mt-5 rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-6">
        <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">How to turn it on</h2>
        <ol className="mt-4 space-y-4">
          {STEPS.map(([title, detail], index) => (
            <li key={title} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bb-accent-soft,#eaf1fd)] text-sm font-bold text-[var(--bb-accent,#2f7fe8)]">
                {index + 1}
              </span>
              <span>
                <span className="block font-semibold text-[var(--bb-text-primary,#111827)]">{title}</span>
                <span className="mt-0.5 block text-[15px] leading-relaxed text-[var(--bb-text-secondary,#44566f)]">
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-5 rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-6">
        <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">Getting back in</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--bb-text-secondary,#2c3e55)]">
          Unlock now sits right beside the lock, with nothing in front of it. No code, no waiting, no
          asking. This is a help, not a trap — if you need your apps, take them back.
        </p>
      </section>

      <section className="mt-5 rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 py-6">
        <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">What Bible Buddy can see</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--bb-text-secondary,#2c3e55)]">
          Not which apps you chose. Apple hands the app a sealed token and a number, and that number —
          how many — is the only thing that crosses over. No Screen Time data is read, stored or sent
          anywhere.
        </p>
      </section>

      {/* The real controls, on a device that has them. */}
      {available === true ? (
        <div className="mt-6">
          <BibleLockSettings />
        </div>
      ) : available === false ? (
        <p className="mt-6 rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f7faff)] px-5 py-5 text-center text-[15px] font-semibold text-[var(--bb-text-secondary,#2c3e55)]">
          Bible Lock needs Apple&rsquo;s Screen Time, so it only works inside the Bible Buddy app on an
          iPhone. Open this page there and the switch will be right here.
        </p>
      ) : null}
    </div>
  );
}
