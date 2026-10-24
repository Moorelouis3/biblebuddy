"use client";

import { useCallback, useEffect, useState } from "react";
import { isNativeApp, nativePlatform } from "@/lib/nativeApp";
import { lastPluginLoadError, nativePushEnabled, registerForNativePush } from "@/lib/nativePush";
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
  /** What the SERVER says is live right now, so staleness is visible. */
  liveBuild: string | null;
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

/**
 * Whether the NATIVE push plugin is in the installed build.
 *
 * Not Capacitor.isPluginAvailable, which answers yes for a plugin that only
 * has a web implementation - and @capacitor/push-notifications has one. That
 * web fallback calls Notification.requestPermission(), which iOS WKWebView
 * does not support and never settles, which is the exact shape of the hang
 * Louis has been sitting in: checkPermissions answers "prompt" (the web
 * implementation reading Notification.permission) and requestPermissions never
 * comes back.
 *
 * PluginHeaders is the list the native side publishes at startup, so a name in
 * it is genuinely compiled into the binary. Returns null where there is no
 * bridge at all.
 */
function nativePluginNames(): string[] | null {
  if (typeof window === "undefined") return null;
  try {
    const headers = (window as unknown as { Capacitor?: { PluginHeaders?: Array<{ name?: string }> } })
      .Capacitor?.PluginHeaders;
    if (!Array.isArray(headers)) return null;
    return headers.map((header) => header?.name).filter((name): name is string => Boolean(name));
  } catch {
    return null;
  }
}

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
    liveBuild: null,
  });
  const [busy, setBusy] = useState(false);
  /**
   * What the attempt is doing, and for how long.
   *
   * "Asking..." on its own cannot tell a native call that never returns from a
   * WebView whose main thread is blocked - and those need completely different
   * fixes. The seconds tick from a plain setInterval, so if this number moves
   * JavaScript is alive and iOS is simply not answering; if it freezes at the
   * same number, native has the thread and nothing in JavaScript can help.
   */
  const [stage, setStage] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!busy) return;
    setElapsed(0);
    const started = Date.now();
    const timer = setInterval(() => setElapsed(Math.round((Date.now() - started) / 1000)), 1_000);
    return () => clearInterval(timer);
  }, [busy]);

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

    /**
     * What is actually live, asked of the server.
     *
     * Three separate times now a fix has been live for an hour while the
     * phone quietly ran the old page, and each time it cost a round of
     * "nothing changed" before anybody thought to compare the two numbers.
     * The app asks instead. Absolute url and a deadline, because CapacitorHttp
     * replaces fetch and a relative one can hang forever in here.
     */
    let liveBuild: string | null = null;
    try {
      const res = await fetch(`${window.location.origin}/api/build-id`, {
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      });
      const body = (await res.json()) as { id?: string };
      if (typeof body.id === "string") liveBuild = body.id.slice(0, 7);
    } catch {
      // Offline, or the request hung. Not knowing is better than claiming.
    }

    setState((prev) => ({ ...prev, permission, tokenStored, appBuild, liveBuild }));
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
        <Row
          label="Website build"
          value={state.webBuild}
          good={state.liveBuild ? state.liveBuild === state.webBuild : null}
        />
        <Row label="Newest build on the server" value={state.liveBuild ?? "could not ask"} />
        {/* The line that separates "iOS refused" from "iOS was never asked,
            because the app is running the browser version of the plugin". */}
        <Row
          label="Native push plugin"
          value={
            nativePluginNames() === null
              ? "no bridge"
              : nativePluginNames()?.includes("PushNotifications")
                ? "in this build"
                : "MISSING - using web fallback"
          }
          good={nativePluginNames()?.includes("PushNotifications") ?? null}
        />
        {/* Which plugin raises the prompt. The push plugin's own
            requestPermissions has never returned on this app, so the ask goes
            through local-notifications, which asks iOS for the same single
            authorization. If this says missing, that route is gone too. */}
        <Row
          label="Prompt comes from"
          value={
            nativePluginNames() === null
              ? "no bridge"
              : nativePluginNames()?.includes("LocalNotifications")
                ? "LocalNotifications"
                : "MISSING - no plugin can ask"
          }
          good={nativePluginNames()?.includes("LocalNotifications") ?? null}
        />
        {/* Everything the binary actually published, so nobody has to guess
            which plugins made it into a build again. */}
        <Row label="Plugins in this build" value={(nativePluginNames() ?? ["no bridge"]).join(", ") || "none"} />
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

      {/* Stale page, said out loud. Every "nothing changed" so far has had a
          decent chance of being this, and it is not something anyone should
          have to work out by comparing two hex strings by eye. */}
      {state.liveBuild && state.liveBuild !== state.webBuild ? (
        <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-3">
          <p className="text-sm font-bold text-amber-900">
            This page is out of date. It is build {state.webBuild}; {state.liveBuild} is live.
          </p>
          <p className="mt-1 text-xs font-medium text-amber-800">
            Nothing here reflects the newest fix until you load it.
          </p>
          <button
            type="button"
            onClick={() => {
              // A fresh url defeats whatever the webview is holding on to,
              // which force-quitting the app demonstrably does not.
              const url = new URL(window.location.href);
              url.searchParams.set("v", String(Date.now()));
              window.location.replace(url.toString());
            }}
            className="mt-3 w-full rounded-xl bg-amber-600 px-4 py-2 text-sm font-black"
          >
            <span style={{ color: "#ffffff" }}>Load the newest version</span>
          </button>
        </div>
      ) : null}

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
            setStage("starting");
            setState((prev) => ({ ...prev, error: null }));
            try {
              // The button must always come back, whatever native does. It
              // has sat on "Asking..." indefinitely more than once, and a
              // dead button is worse than a failure message because there is
              // nothing to do but close the app.
              const ok = await Promise.race([
                registerForNativePush(undefined, setStage),
                new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 135_000)),
              ]);
              if (!ok) {
                // Say which of the two it was. "Did not grant permission, or
                // the plugin is missing" told Louis nothing three times over.
                const names = nativePluginNames();
                setState((prev) => ({
                  ...prev,
                  error:
                    names && !names.includes("PushNotifications")
                      ? `The push plugin is not in app build ${prev.appBuild}. iOS was never asked, because the app is running the browser version of it, which iOS cannot show a prompt for. This needs a new TestFlight build. Native plugins present: ${names.join(", ") || "none"}.`
                      : names && !names.includes("LocalNotifications")
                        ? `Neither plugin that can raise the prompt is in app build ${prev.appBuild}. This needs a new TestFlight build. Native plugins present: ${names.join(", ") || "none"}.`
                        : lastPluginLoadError()
                          ? `Could not load the push plugin's JavaScript: ${lastPluginLoadError()}. The native side has it, so this is the web half.`
                          : "iPhone did not grant permission, or it never answered. Reported. If no prompt appeared at all, force-close the app and tap this once more.",
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
          <span style={{ color: "#ffffff" }}>
            {busy ? `Asking… ${elapsed}s` : "Turn on notifications"}
          </span>
        </button>
      )}

      {/* The live stage. If the seconds above are moving, JavaScript is fine
          and iOS is not answering; if they are stuck, native owns the thread. */}
      {busy && stage ? (
        <p className="mt-2 text-center text-xs font-semibold text-[var(--bb-text-secondary,#5f6368)]">
          {stage}
        </p>
      ) : null}
    </div>
  );
}
