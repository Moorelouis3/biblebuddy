"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  TESTERS_NEEDED,
  TESTER_DAYS,
  TESTER_GROUP_URL,
  TESTER_OPT_IN_URL,
} from "@/lib/androidBeta";
import { recordPlayStoreTap } from "@/lib/appStoreAsk";

/**
 * "Bible Buddy is in Android beta testing" - the page every Play button goes
 * to while the closed test is running.
 *
 * Louis, 2026-11-03: "the play store buttons lead to a page that says Bible
 * buddy is Android betta testing then explian it shortly with stpep 1 and
 * step 2".
 *
 * The order of the two steps is the only thing on this page that can go
 * wrong, so it is said three times: in the red box before either button, in
 * the step numbers, and again under step 2. Someone who taps step 2 first is
 * told by Google that they are not a tester, which reads like our app being
 * broken rather than their having skipped a step - and the people most
 * likely to skip are the ones skimming on a phone.
 *
 * Reached by people on every device, not just Android: the landing page shows
 * the Play button to everybody rather than sniffing the user agent, the same
 * decision LandingStoreCtas already made for the Apple one. Hence the line at
 * the bottom for iPhone and desktop visitors instead of a dead end.
 */

/** Same endpoint and event the landing page buttons use, so placements compare. */
function track(placement: string) {
  if (typeof window === "undefined") return;
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "clicked_app_store",
        session_id: window.localStorage.getItem("bb:landing-session-id") || "unknown",
        page_path: window.location.pathname,
        metadata: { clickedFrom: placement, store: "android" },
      }),
    });
  } catch {
    // Measurement never breaks the thing being measured.
  }
}

export default function AndroidBetaPage() {
  useEffect(() => {
    track("android_page_view");
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-5 py-12 text-[#07162f]">
      <div className="mx-auto w-full max-w-[560px]">
        <img
          src="/icons/icon-192.png"
          alt=""
          width={72}
          height={72}
          className="h-18 w-18 rounded-[20px] shadow-[0_8px_24px_rgba(7,22,47,0.22)]"
        />

        <p className="mt-6 inline-block rounded-full bg-[#0056FD]/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#0056FD]">
          Android beta
        </p>

        <h1 className="mt-3 text-[2rem] font-black leading-[1.15]">
          Bible Buddy is in Android beta testing
        </h1>

        <p className="mt-4 text-[1.05rem] font-semibold leading-7 text-[#3c4a63]">
          It is built, it is approved, and it works. Before Google will list it
          publicly on the Play Store, they want {TESTERS_NEEDED} people to install
          it and keep it for {TESTER_DAYS} days. You can be one of them right now.
        </p>

        {/* The one thing that can go wrong, said before either button. */}
        <div className="mt-7 rounded-2xl border-2 border-[#c62828] bg-[#fdf2f2] p-4">
          <p className="text-[1.05rem] font-black text-[#c62828]">Please do Step 1 first</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#8c2f2f]">
            Step 2 will not let you in until you have joined the group. If it says
            you are not a tester, come back and do Step 1.
          </p>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-black text-[#c62828]">Step 1 &mdash; Join the testing group</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#3c4a63]">
            This is what gives you permission to see the test. It will not email you.
          </p>
          <a
            href={TESTER_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("android_page_step1")}
            className="mt-3 flex w-full items-center justify-center rounded-2xl bg-[#c62828] px-5 py-4 text-base font-black transition hover:-translate-y-0.5"
            style={{ color: "#ffffff" }}
          >
            Join the group
          </a>
          <p className="mt-2 text-xs font-semibold text-[#6d7789]">
            Tap <strong>Join group</strong> when the page opens.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-black">Step 2 &mdash; Get Bible Buddy</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#3c4a63]">
            Only works once Step 1 has gone through. Give it a minute if it does not.
          </p>
          {/* Light blue, and the colour is an inline style, not a class
              (Louis, 2026-11-03: "cant read the button").

              This shipped as bg-[#07162f] text-white and rendered as a solid
              navy block with no text on it at all. The reason is a cascade
              trap worth knowing, because it applies to every <a> on the site:
              globals.css declares `a { color: inherit }` OUTSIDE any @layer,
              and unlayered CSS beats layered CSS. Tailwind v4 puts its
              utilities in a layer, so on an anchor every text-colour class -
              text-white, text-[#fff], any of them - loses to that rule and
              the link just inherits its parent's colour. Here the parent is
              <main className="text-[#07162f]">, so it painted navy on navy.

              Measured on the live site: .text-white on a <div> gives white,
              on an <a> gives #101827. A <span> inside the anchor would also
              work; an inline style is simpler and cannot be undone by a
              later class. Do not replace these with a text-* class. */}
          <a
            href={TESTER_OPT_IN_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              recordPlayStoreTap();
              track("android_page_step2");
            }}
            className="mt-3 flex w-full items-center justify-center rounded-2xl bg-[#9fd0ff] px-5 py-4 text-base font-black transition hover:-translate-y-0.5 hover:bg-[#8ac5ff]"
            style={{ color: "#07162f" }}
          >
            Download on Google Play
          </a>
          <p className="mt-2 text-xs font-semibold text-[#6d7789]">
            Tap <strong>Become a tester</strong>, then <strong>Download it on Google Play</strong>.
          </p>
        </section>

        <div className="mt-9 rounded-2xl bg-white p-5 shadow-[0_2px_14px_rgba(7,22,47,0.07)]">
          <p className="text-sm font-semibold leading-6 text-[#3c4a63]">
            <strong className="text-[#07162f]">That is the whole job.</strong> Keep it
            installed for {TESTER_DAYS} days and use it however you normally would.
            After that Bible Buddy goes live on Google Play for everybody.
          </p>
        </div>

        {/* Not everybody who lands here is on Android - the Play button shows
            to all visitors rather than sniffing the device. */}
        <p className="mt-8 text-sm font-semibold leading-6 text-[#6d7789]">
          On an iPhone? Bible Buddy is already live &mdash;{" "}
          <a
            href="https://apps.apple.com/app/id6822155944"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("android_page_ios_fallback")}
            className="font-black text-[#0056FD] underline"
          >
            get it on the App Store
          </a>
          .
        </p>

        <p className="mt-3 text-sm font-semibold text-[#6d7789]">
          Or{" "}
          <Link href="/signup" className="font-black text-[#0056FD] underline">
            keep using the web version
          </Link>
          . It has everything the app has.
        </p>
      </div>
    </main>
  );
}
