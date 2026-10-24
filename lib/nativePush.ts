import { isNativeApp, nativePlatform, NATIVE_APP_UA_MARKER } from "@/lib/nativeApp";
import { supabase } from "@/lib/supabaseClient";

/**
 * Remote push inside the store apps (Louis, 2026-10-11).
 *
 * The website uses Web Push: a browser push service, an endpoint URL and a
 * pair of keys, stored in push_subscriptions. None of that exists on iOS. The
 * app asks the OS for a device token and hands it to Apple's APNs, so the
 * token goes in its own table, native_push_tokens.
 *
 * SWITCHED OFF until Stage 2. Registering needs the Push Notifications
 * capability, which needs a paid Developer Program membership and an APNs
 * key - none of which exist in October. Asking for notification permission
 * before anything can be delivered would spend the one prompt iOS gives you
 * and deliver nothing, so it waits for NEXT_PUBLIC_NATIVE_PUSH_ENABLED.
 *
 * Written now so that switching it on is an environment variable plus
 * certificates, rather than a feature to build the week before submission.
 *
 * The daily reading reminder does NOT depend on this - it is a local
 * notification scheduled by the phone (lib/nativeReminders.ts) and already
 * works. This covers what only the server knows: a reply in your group, a
 * streak about to break.
 */

/**
 * On in the app unless it is explicitly switched off.
 *
 * It used to require NEXT_PUBLIC_NATIVE_PUSH_ENABLED === "true", which was
 * right while nothing could be delivered: spending the one notification prompt
 * iOS gives you, to deliver nothing, is how an app loses it for good. APNs is
 * configured now, so that reason is gone - and the flag was costing more than
 * it bought. NEXT_PUBLIC_ values are baked in when Vercel builds, so a
 * redeploy that reuses its build cache can leave the old value in the bundle,
 * and the symptom is exactly what Louis saw: open the app, no prompt, no
 * error, nothing to look at (2026-10-17).
 *
 * Set it to "off" to stop registering.
 */
export function nativePushEnabled(): boolean {
  return isNativeApp() && process.env.NEXT_PUBLIC_NATIVE_PUSH_ENABLED !== "off";
}

/** Loaded on demand: a top-level Capacitor import lands in the server bundle. */
async function pushPlugin() {
  if (!nativePushEnabled()) return null;
  try {
    const mod = await import("@capacitor/push-notifications");
    return mod.PushNotifications;
  } catch {
    return null;
  }
}

async function storeToken(token: string): Promise<void> {
  const platform = nativePlatform();
  if (platform === "web") return;
  try {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    if (!accessToken) return;
    await fetch("/api/push/register-device", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ token, platform }),
    });
  } catch (error) {
    console.warn("[PUSH] could not store device token:", error);
  }
}

/**
 * Say where registration stopped, somewhere Louis and I can both read it.
 *
 * native_push_tokens held zero rows on 2026-10-17 - no phone had ever
 * registered - and from the outside that is indistinguishable from the prompt
 * never being asked for, the permission being refused, the plugin missing from
 * the build, or APNs rejecting the app. Every one of those failures was being
 * written to a console inside a WebView on a phone, which nobody can see.
 *
 * So the phone files it as a bug report instead, through the endpoint crashes
 * already use. One line, the stage it died at, and the platform. It only ever
 * reports failures, and identical ones collapse into a single row by
 * fingerprint, so this cannot flood the tracker.
 */
async function reportPushFailure(stage: string, detail?: unknown): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/bug-reports/crash", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "PushRegistration",
        message: `Notifications: ${stage} (${nativePlatform()})`,
        stack:
          detail instanceof Error
            ? `${detail.name}: ${detail.message}\n${detail.stack ?? ""}`
            : detail === undefined
              ? ""
              : JSON.stringify(detail).slice(0, 2000),
        page: window.location.pathname,
        boundary: "push",
      }),
    });
  } catch {
    // If even this cannot get out, there is nothing further to try.
  }
}

/**
 * Only one request to iOS, ever, at a time (Louis, 2026-10-24).
 *
 * THE BUG THIS FIXES. Two different places called registerForNativePush:
 * AppShell on mount, and the "Turn on notifications" button in Settings.
 * Neither knew about the other, so AppShell's automatic call spent the
 * authorization request on launch; the six second race gave up in JavaScript
 * but the NATIVE request stays outstanding - a timeout stops us waiting, it
 * cannot cancel iOS. Tapping the button then issued a SECOND
 * requestPermissions while the first was still open, and iOS answered
 * neither. The button sat on "Asking..." forever and permission stayed at
 * "prompt".
 *
 * That is exactly what Louis's phone showed on 2026-10-24: running ios, plugin
 * present, registering on, permission prompt, registered "not yet", button
 * stuck. native_push_tokens had zero rows, for anyone, ever.
 *
 * The earlier fix on 2026-10-17 stopped two PLUGINS colliding
 * (push-notifications and local-notifications). It did not stop two callers of
 * the same plugin, which is what was left.
 *
 * Every caller now shares one promise, so a second call can never reach iOS
 * while the first is open.
 */
let registrationInFlight: Promise<boolean> | null = null;

export function registerForNativePush(onOpenUrl?: (url: string) => void): Promise<boolean> {
  if (registrationInFlight) return registrationInFlight;
  registrationInFlight = runRegistration(onOpenUrl).finally(() => {
    registrationInFlight = null;
  });
  return registrationInFlight;
}

/**
 * Register only if the reader has ALREADY said yes.
 *
 * For callers that run on their own, without anybody asking - AppShell on
 * mount. iOS gives an app one notification prompt, and spending it silently on
 * launch is both a wasted prompt and the cause of the deadlock above. Asking is
 * now the button's job alone; this only picks up the token for somebody who
 * already granted it on a previous run.
 */
export async function registerIfPermissionGranted(
  onOpenUrl?: (url: string) => void,
): Promise<boolean> {
  if (!isNativeApp()) return false;
  const push = await pushPlugin();
  if (!push) return false;
  try {
    const permission = await push.checkPermissions();
    if (permission.receive !== "granted") return false;
  } catch {
    return false;
  }
  return registerForNativePush(onOpenUrl);
}

type PushPlugin = NonNullable<Awaited<ReturnType<typeof pushPlugin>>>;
type PushPermission = Awaited<ReturnType<PushPlugin["checkPermissions"]>>;

/**
 * The OTHER plugin that can raise the same prompt.
 *
 * iOS has one notification authorization per app. @capacitor/push-notifications
 * and @capacitor/local-notifications both ask for that single thing, through
 * UNUserNotificationCenter.requestAuthorization. They are interchangeable for
 * the purpose of getting the prompt on screen - see askForAuthorization.
 */
async function localPlugin() {
  if (!isNativeApp()) return null;
  try {
    const mod = await import("@capacitor/local-notifications");
    return mod.LocalNotifications;
  } catch {
    return null;
  }
}

/**
 * Get the iOS prompt on screen, by any plugin that works, and then believe
 * the OS rather than the promise (Louis, 2026-10-24).
 *
 * Two separate faults, found the same day:
 *
 * 1. The ASK went through the push plugin, whose requestPermissions never
 *    returns on this app and never shows a prompt. Fixed below by asking
 *    through local-notifications instead, which raises the identical iOS
 *    authorization prompt and is known to work here.
 * 2. The WAIT was a six second timer, treated as failure when it won.
 *
 * This used to race requestPermissions against a six second timer and call
 * the timer winning a failure. That made sense while the request genuinely
 * hung - two callers were asking at once, see above - but as a general rule
 * it is wrong, and fixing the deadlock turned it into the NEXT bug: somebody
 * who takes seven seconds to read the dialog and tap Allow would have been
 * told it failed. Worse, register() would never run, so permission would be
 * granted with no token to show for it, which looks identical from the
 * outside to the thing we have spent a fortnight chasing.
 *
 * So no timer decides anything now. iOS records the answer in the
 * authorization status whether or not the promise that asked for it ever
 * resolves, so the status is polled alongside, and whichever arrives first
 * wins. Only two minutes of the status staying undecided is a real hang.
 */
async function askForAuthorization(push: PushPlugin): Promise<PushPermission | null> {
  // A holder rather than a bare variable: the promise below assigns from a
  // callback, which TypeScript cannot see, and a plain `let` would stay
  // narrowed to null.
  const asked: { status: PushPermission | null; threw: boolean } = {
    status: null,
    threw: false,
  };

  /**
   * Ask through LOCAL notifications, not push (Louis, 2026-10-24).
   *
   * The push plugin's requestPermissions is the call that hangs. It has hung
   * on every build since 2026-10-11, through four of them, and it hangs
   * without a prompt appearing and without ever coming back - the button sits
   * on "Asking..." and even a JavaScript timer beside it stops firing.
   *
   * iOS has ONE notification authorization per app, and both plugins ask for
   * that same one through UNUserNotificationCenter. So the prompt does not
   * have to come from the broken plugin. local-notifications is linked into
   * the same binary and is demonstrably working - it is what schedules the
   * daily reading reminder - so it raises the prompt, and push is left to do
   * the one thing only it can: fetch the APNs token, afterwards, once
   * permission already exists.
   *
   * Whatever answer arrives is read back off push.checkPermissions below,
   * which has always worked, so the two plugins cannot disagree about it.
   */
  const local = await localPlugin();
  if (local) {
    void local.requestPermissions().catch((error) => {
      asked.threw = true;
      console.warn("[PUSH] local-notifications requestPermissions threw:", error);
    });
  } else {
    // No local plugin in this build: nothing to lose by asking the old way.
    void push
      .requestPermissions()
      .then((status) => {
        asked.status = status;
      })
      .catch((error) => {
        asked.threw = true;
        console.warn("[PUSH] requestPermissions threw:", error);
      });
  }

  // Two minutes, read once a second. Long enough to answer a phone call and
  // come back to the dialog; short enough that a true hang still reports.
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 1_000));

    const answered = asked.status;
    if (answered) return answered;

    try {
      const status = await push.checkPermissions();
      if (status.receive === "granted" || status.receive === "denied") return status;
    } catch {
      // One failed read of the status is not an answer. Keep waiting.
    }

    if (asked.threw) {
      // The ask itself failed. Give the status a moment in case iOS put the
      // dialog up regardless, then stop - sitting out the full two minutes
      // for an error we already have helps nobody.
      await new Promise((resolve) => setTimeout(resolve, 2_000));
      try {
        const status = await push.checkPermissions();
        if (status.receive === "granted" || status.receive === "denied") return status;
      } catch {
        // Fall through to the failure report.
      }
      return null;
    }
  }

  return null;
}

/**
 * Ask for permission, register with APNs, and remember the token.
 *
 * Call it once per session for a signed-in reader. Safe to call repeatedly:
 * the token is the primary key, so re-registering updates last_seen_at
 * rather than piling up rows.
 */
async function runRegistration(
  onOpenUrl?: (url: string) => void,
): Promise<boolean> {
  /**
   * The silent bail, which is why we have learned nothing for a week.
   *
   * This was `if (!isNativeApp()) return false;` with no report, so the most
   * likely failure of all - the app not being recognised as the app - left no
   * trace anywhere. Louis opened it repeatedly on 2026-10-17 and
   * native_push_tokens stayed empty while zero diagnostics were filed, which
   * is only possible if we were returning here.
   *
   * It matters because the two push systems are mutually exclusive by design:
   * AppShell starts web push only when isNativeApp() is false. So if this is
   * false inside the TestFlight app, the app quietly runs the website's push
   * path in a WKWebView, which can never prompt the way iOS needs - exactly
   * the symptom Louis described, and exactly his guess ("it's set up for the
   * web version").
   *
   * So it reports, with what the check actually saw. Browsers reach here all
   * the time and must not file anything.
   */
  if (!isNativeApp()) {
    if (typeof window !== "undefined") {
      const capacitor = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string } }).Capacitor;
      // window.Capacitor exists on every page, web included - @capacitor/core
      // is imported client-side for the Bible lock, and its web shim sets
      // this global even outside the app. It is not evidence of being the
      // app; the UA marker the shell actually adds is. Using hasCapacitor
      // here was filing this report for every ordinary signed-in web visit
      // (2026-10-17).
      const looksLikeTheApp = navigator.userAgent.includes(NATIVE_APP_UA_MARKER);
      // Only when something suggests this really is the app. An ordinary
      // browser is not a bug report.
      if (looksLikeTheApp) {
        await reportPushFailure("the app was not recognised as the app", {
          hasCapacitor: Boolean(capacitor),
          isNativePlatform: (() => {
            try {
              return capacitor?.isNativePlatform?.() ?? null;
            } catch {
              return "threw";
            }
          })(),
          platform: (() => {
            try {
              return capacitor?.getPlatform?.() ?? null;
            } catch {
              return "threw";
            }
          })(),
          uaHasMarker: navigator.userAgent.includes(NATIVE_APP_UA_MARKER),
          userAgent: navigator.userAgent.slice(0, 300),
        });
      }
    }
    return false;
  }

  const push = await pushPlugin();
  if (!push) {
    await reportPushFailure("plugin not available in this build");
    return false;
  }

  try {
    let permission = await push.checkPermissions();
    if (permission.receive === "prompt" || permission.receive === "prompt-with-rationale") {
      const decided = await askForAuthorization(push);
      if (!decided) {
        await reportPushFailure("iOS never recorded an answer to the permission prompt", {
          checkPermissionsSaid: permission.receive,
        });
        return false;
      }
      permission = decided;
    }
    if (permission.receive !== "granted") {
      await reportPushFailure(`permission is "${permission.receive}"`);
      return false;
    }

    // Listeners before register(), or the first token can arrive with
    // nothing attached to catch it.
    //
    // Not awaited, deliberately. addListener returns a promise that in some
    // Capacitor versions never settles, and awaiting it here would mean
    // register() was never reached - permission granted, no token, nothing in
    // native_push_tokens and no error anywhere to explain it. The same trap
    // already cost a day on native sign-in; the listener is attached
    // synchronously either way.
    void push.removeAllListeners();
    void push.addListener("registration", (token) => {
      void storeToken(token.value);
    });
    void push.addListener("registrationError", (error) => {
      console.warn("[PUSH] registration failed:", error);
      void reportPushFailure("APNs refused to issue a token", error);
    });
    void push.addListener("pushNotificationActionPerformed", (action) => {
      const url = action.notification?.data?.url;
      if (typeof url === "string" && url.startsWith("/")) onOpenUrl?.(url);
    });

    await push.register();
    return true;
  } catch (error) {
    console.warn("[PUSH] could not register:", error);
    await reportPushFailure("threw while registering", error);
    return false;
  }
}
