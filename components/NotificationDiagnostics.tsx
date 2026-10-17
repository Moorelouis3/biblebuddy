"use client";

import { useCallback, useEffect, useState } from "react";
import { isNativeApp, nativePlatform } from "@/lib/nativeApp";
import { nativePushEnabled, registerForNativePush } from "@/lib/nativePush";
import { supabase } from "@/lib/supabaseClient";

/**
 * What iOS actually thinks about notifications, in Settings.
 *
 * Louis spent 2026-10-17 opening the app and getting no permission prompt,
 * with nothing anywhere to say why - no error, no state, nothing to read. Every
 * answer was a guess, and most of them were wrong. This is the end of that:
 * four lines saying what is true, and a button to try again.
 *
 * Renders nothing outside the app, where none of it applies.
 */

type State = {
  permission: string;
  tokenStored: boolean | null;
  error: string | null;
  /** The installed TestFlight build, e.g. "1.0 (14)". */
  appBuild: string;
  /** The website build the app is showing, which is a separate thing entirely. */
  webBuild: string;
};

/**
 * Which app, and which website.
 *
 * These are two different versions and they drift apart constantly: the web
 * half updates the moment Vercel deploys, the native half only when somebody
 * installs a TestFlight build. All evening we have been unable to tell whether
 * a fix had reached the phone, and every answer depended on guessing which of
 * the two was stale - so the phone says both out loud now.
 *
 * It matters right now because "Turn on notifications" hangs forever with no
 * timeout firing, and a JavaScript timer that never runs means either old web
 * code or a native call blocking the WebView thread. These two lines tell
 * those apart in one glance instead of another round of deploys.
 */
const WEB_BUILD = (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "dev").slice(0, 7);

function Row({ label, value, good }: { label: string; value: string; good?: boolean | null }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--bb-card-border,#eef2f7)] py-2 last:border-b-0">
      <span className="text-sm font-semibold text-[var(--bb-text-secondary,#5f6368)]">{label}</span>
      <span
        className={`text-sm font-black ${
          good === true ? "text-[#2f8f5b]" : good === false ? "text-[#c2410c]" : "text-[var(--bb-text-primary,#111827)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function NotificationDiagnostics() {
  const [native, setNative] = useState(false);
  const [state, setState] = useState<State>({
    permission: "checking…",
    tokenStored: null,
    error: null,
    appBuild: "checking…",
    webBuild: WEB_BUILD,
  });
  const [busy, setBusy] = useState(false);

  const read = useCallback(async () => {
    if (!isNativeApp()) return;

    // The installed TestFlight build. A separate question from the website
    // build above it, and the one nobody could answer all evening.
    let appBuild = "unknown";
    try {
      const appMod = await import("@capacitor/app");
      const info = await appMod.App.getInfo();
      appBuild = `${info.version} (${info.build})`;
    } catch (error) {
      appBuild = `unavailable (${error instanceof Error ? error.message : "no detail"})`;
    }

    let permission = "unknown";
    try {
      const mod = await import("@capacitor/push-notifications");
      const result = await mod.PushNotifications.checkPermissions();
      permission = result.receive;
    } catch (error) {
      permission = `plugin missing (${error instanceof Error ? error.message : "no detail"})`;
    }

    let tokenStored: boolean | null = null;
    try {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { count } = await supabase
          .from("native_push_tokens")
          .select("token", { count: "exact", head: true })
          .eq("user_id", data.user.id);
        tokenStored = (count ?? 0) > 0;
      }
    } catch {
      // The table is service-role only for writes; a failed read just leaves
      // this unknown rather than wrong.
    }

    setState((prev) => ({ ...prev, permission, tokenStored, appBuild }));
  }, []);

  useEffect(() => {
    const inApp = isNativeApp();
    setNative(inApp);
    if (inApp) void read();
  }, [read]);

  if (!native) return null;

  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">Notifications</h2>
      <p className="text-sm text-gray-600">
        Whether this phone can receive a notification when somebody messages you.
      </p>

      <div className="mt-4">
        <Row label="Running in the app" value={nativePlatform()} good />
        {/* Two versions, not one. The app updates only when a TestFlight build
            is installed; the website updates on every deploy. Telling them
            apart is the difference between "the fix has not reached you" and
            "the fix does not work". */}
        <Row label="App build" value={state.appBuild} />
        <Row label="Website build" value={state.webBuild} />
        <Row label="Registering is on" value={nativePushEnabled() ? "yes" : "no"} good={nativePushEnabled()} />
        <Row
          label="iPhone permission"
          value={state.permission}
          good={state.permission === "granted" ? true : state.permission === "denied" ? false : null}
        />
        <Row
          label="This phone registered"
          value={state.tokenStored === null ? "unknown" : state.tokenStored ? "yes" : "not yet"}
          good={state.tokenStored}
        />
      </div>

      {state.error ? (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      ) : null}

      {state.permission === "denied" ? (
        <p className="mt-3 rounded-lg bg-[var(--bb-surface-soft,#f3f8ff)] px-3 py-2 text-sm font-medium text-[var(--bb-text-secondary,#2c3e55)]">
          iPhone only asks once. Turn them on in iPhone Settings, under Bible Buddy.
        </p>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setState((prev) => ({ ...prev, error: null }));
            try {
              const ok = await registerForNativePush();
              if (!ok) {
                setState((prev) => ({
                  ...prev,
                  error: "iPhone did not grant permission, or the plugin is not in this build.",
                }));
              }
              // The token arrives on a listener, so give it a moment.
              await new Promise((resolve) => setTimeout(resolve, 1500));
              await read();
            } catch (error) {
              setState((prev) => ({
                ...prev,
                error: error instanceof Error ? error.message : "Could not ask for permission.",
              }));
            }
            setBusy(false);
          }}
          className="mt-4 w-full rounded-2xl px-5 py-3 text-sm font-black transition hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: "var(--bb-button, #2f7fe8)" }}
        >
          {/* The label on its own span with a fixed colour. On Louis's phone
              this button rendered as an empty blue bar - he could not tell it
              was a button, and only pressed it because I said where it was.
              globals.css sets `color: var(--bb-button-text) !important` on
              several button selectors, and an !important rule outranks the
              inline colour that used to be on the button itself; the span is
              not what those rules match. */}
          <span style={{ color: "#ffffff" }}>{busy ? "Asking…" : "Turn on notifications"}</span>
        </button>
      )}
    </div>
  );
}
