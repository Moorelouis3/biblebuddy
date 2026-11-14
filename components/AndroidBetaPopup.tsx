"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { BETA_OPEN, TESTERS_NEEDED, TESTER_DAYS } from "../lib/androidBeta";
import { canAskForPlayStore, recordPlayStoreTap, silencePlayStoreAsk, snoozePlayStoreAsk } from "../lib/appStoreAsk";
import { isAndroid, isStandalone } from "../lib/installEnvironment";
import { isNativeApp } from "../lib/nativeApp";
import { coordinatorActive } from "../lib/popups/switch";

/**
 * "You're on Android - help us launch."
 *
 * Louis, 2026-11-03: "Can we make a pop-up to where it only pops up to
 * anybody on Android? And ask them".
 *
 * The sibling of AppStorePopup, and deliberately a different ask. The iPhone
 * one offers somebody a better version of what they already have. This one
 * asks for a favour: Google will not list Bible Buddy publicly until twelve
 * people have kept it installed for fourteen days, and the people reading
 * this on an Android phone are the only ones who can supply that. So it says
 * what it needs and why, rather than pretending to be a download prompt.
 *
 * It sends them to /android rather than Play, because joining the tester
 * group has to happen first - see lib/androidBeta.
 *
 * Never appears inside the native app, on anything that is not Android, from
 * a home-screen launcher, or once BETA_OPEN goes false.
 */

/** Let the page settle first; a modal over a half-drawn dashboard reads as an error. */
const DELAY_MS = 2500;

type Session = { userId: string; accessToken: string };

/** Analytics, matching the events the App tab reads. Fire and forget. */
async function log(actionType: string, actionLabel: string) {
  try {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;
    await supabase.from("master_actions").insert({
      user_id: user.id,
      action_type: actionType,
      action_label: actionLabel,
      event_metadata: { surface: "android_beta_popup", store: "android", placement: "android_popup" },
    });
  } catch {
    // Never let measurement break the thing being measured.
  }
}

/**
 * The tap, logged so it survives leaving the page.
 *
 * Same reasoning as the iPhone popup: the ordinary client insert is async and
 * the navigation can cancel it mid-flight, losing exactly the number this
 * popup exists to produce. The session is captured while the popup is merely
 * open, so the click only fires an already-prepared keepalive request.
 */
function logTapBeacon(session: Session | null) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!session || !url || !anon) return;
  try {
    void fetch(`${url}/rest/v1/master_actions`, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        apikey: anon,
        Authorization: `Bearer ${session.accessToken}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        user_id: session.userId,
        action_type: "android_beta_popup_clicked",
        action_label: "Android beta popup tapped",
        event_metadata: { surface: "android_beta_popup", store: "android", placement: "android_popup" },
      }),
    });
  } catch {
    // ignore
  }
}

export default function AndroidBetaPopup({ enabled }: { enabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!enabled) return;
    // The popup coordinator shows this ask instead when it is on, under the
    // one-per-visit limit. Both asking would be exactly the stacking it ends.
    if (coordinatorActive()) return;
    // The beta is over; there is nothing to recruit for.
    if (!BETA_OPEN) return;
    // Already in the real app, or on anything that is not Android.
    if (isNativeApp() || !isAndroid()) return;
    // Launched from a home-screen icon: they have already committed to a
    // shortcut, and interrupting that with an install is rude.
    if (isStandalone()) return;

    // One shared answer across every surface that asks - see lib/appStoreAsk.
    if (!canAskForPlayStore()) return;

    const timer = window.setTimeout(() => {
      // Asked again here, not only above: test mode can be switched on by the
      // page a moment after it loads, which is after the first check.
      if (coordinatorActive()) return;
      setOpen(true);
      void log("android_beta_popup_shown", "Android beta popup shown");
      // Prepared now so the tap has nothing left to await.
      void supabase.auth.getSession().then(({ data }) => {
        const u = data.session;
        if (u?.user?.id && u.access_token) setSession({ userId: u.user.id, accessToken: u.access_token });
      });
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [enabled]);

  if (!open) return null;

  const close = (decide: () => void, action: string, label: string) => {
    decide();
    setOpen(false);
    void log(action, label);
  };

  return (
    <div
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/60 px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Help us launch Bible Buddy on Android"
    >
      <div className="w-full max-w-sm rounded-[28px] bg-white p-6 text-center shadow-2xl">
        <img
          src="/icons/icon-192.png"
          alt=""
          width={64}
          height={64}
          className="mx-auto h-16 w-16 rounded-[18px] shadow-[0_6px_18px_rgba(14,26,58,0.28)]"
        />
        <h2 className="mt-3 text-xl font-black text-gray-950">Bible Buddy is coming to Android</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
          It is built and approved &mdash; but Google will not list it publicly until{" "}
          {TESTERS_NEEDED} people install it and keep it for {TESTER_DAYS} days.
          You&apos;re on Android. Would you be one of them?
        </p>

        <a
          href="/android"
          onClick={() => {
            logTapBeacon(session);
            recordPlayStoreTap();
            setOpen(false);
          }}
          className="mt-5 flex w-full items-center justify-center rounded-2xl bg-[#0056FD] px-5 py-3.5 text-[1.02rem] font-black text-white transition hover:opacity-90"
        >
          Yes, show me how
        </a>

        <button
          type="button"
          onClick={() => close(snoozePlayStoreAsk, "android_beta_popup_later", "Android beta popup - not now")}
          className="mt-2 w-full rounded-2xl px-5 py-2.5 text-sm font-bold text-gray-500 transition hover:text-gray-700"
        >
          Not now
        </button>
        <button
          type="button"
          onClick={() => close(silencePlayStoreAsk, "android_beta_popup_never", "Android beta popup dismissed forever")}
          className="mt-1 w-full px-5 py-1 text-xs font-semibold text-gray-400 transition hover:text-gray-600"
        >
          Don&apos;t show this again
        </button>
      </div>
    </div>
  );
}
